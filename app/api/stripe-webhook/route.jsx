import { clerkClient } from "@clerk/nextjs";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const runtime = 'edge'

export async function POST(req) {
    if (req === null)
        throw new Error(`Missing userId or request`);

    const raw_body = await req.text()
    const headersList = headers()
    const stripeSignature = headersList.get("stripe-signature")

    if (stripeSignature === null) throw new Error("stripeSignature is null");

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            raw_body,
            stripeSignature,
            webhookSecret
        );
    } catch (error) {
        console.error(error.message)
        if (error instanceof Error)
            return NextResponse.json(
                {
                    error: error.message,
                },
                {
                    status: 400,
                }
            );
    }

    if (event === undefined) throw new Error(`event is undefined`);
    switch (event.type) {
        case "checkout.session.completed":

            if (!event.data.object.metadata?.userId) throw new Error(`missing userId`);
            const userId = event.data.object.metadata?.userId
            const user = await clerkClient.users.getUser(userId)
            const existingCredits = (user.unsafeMetadata?.computation_units)? parseInt(user.unsafeMetadata?.computation_units):0
            const purchasedCredits = event.data.object.amount_subtotal*100
            const balance = existingCredits + purchasedCredits
            console.log(`Payment successful for session ID: ${event.data.object.id} `);
            await clerkClient.users.updateUserMetadata(
                userId,
            {
                unsafeMetadata: {
                    'computation_units': String(balance)
                },
            });

            break;
        default:
            console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ status: 200, message: "success" });
}