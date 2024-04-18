import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});

export const runtime = 'edge'

export async function POST(req) {
    const { userId } = auth();
    const user = await currentUser()
    const primaryEmail = user.emailAddresses.find((email)=>email.id===user.primaryEmailAddressId)
    const { quantity } = await req.json();

    if (!quantity) throw new Error(`missing quantity`);

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: process.env.TOKEN_PRICE_ID,
                    quantity: 10,
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                },
            ],
            metadata: {
                userId,
            },
            customer_email: primaryEmail.emailAddress,
            mode: "payment",
            success_url: `${req.headers.get("origin")}/`,
            cancel_url: `${req.headers.get("origin")}/`,
        });

        return NextResponse.json({ session }, { status: 200 });
    } catch (error) {
        if (error instanceof Error)
            throw new Error(
                `Error creating Stripe checkout session: ${error.message}`
            );
    }
}