import { NextResponse } from "next/server";
import OpenAI from "openai";
import {ParseSelection} from "@/utils/ParseSelection";
import {auth, clerkClient} from "@clerk/nextjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge'

const chargeTokens = async (count)=>{
    const { userId } = auth()
    if (!userId) throw new Error('No user')

    const user = await clerkClient.users.getUser(userId)
    const existingCredits = (user.unsafeMetadata?.computation_units)? parseInt(user.unsafeMetadata?.computation_units):0
    const cost = 10*count
    const balance = existingCredits - cost

    if (balance>0) {
        console.log(`${cost} tokens charged to userId ${userId}`);
        await clerkClient.users.updateUserMetadata(
            userId,
            {
                unsafeMetadata: {
                    'computation_units': String(balance)
                },
            });
    } else {
        throw new Error('not enough tokens')
    }
}

export async function POST(req, res) {
    const {industries, disclosures} = await req.json();
    console.log(industries,disclosures)
    const messages = ParseSelection(industries, disclosures)

    let api_response

    if (messages.length){
        const promises = messages.map((chat)=>{
            return openai.chat.completions.create({
                model: process.env.OPENAI_TRAINING_MODEL_ID,
                messages: chat.chat_text,
            })
        })

        const results = await Promise.all(promises)
        await chargeTokens(messages.length)
        console.log('results done')
        const responses = results.map((response, index)=>
            `__${messages[index].chat_disclosure.topic}__\n\n${response.choices[0].message.content}\n`
        )

        api_response = NextResponse.json({ output: responses.join('\n') }, { status: 200 });

    } else {

        console.log("invalid payload");

        api_response = NextResponse.json({ error: 'invalid payload' }, { status: 500 });
    }

    return api_response
}