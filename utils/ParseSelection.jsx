

export function ParseSelection(industries, disclosures){
    let chats = []

    const industry_descriptions = industries.map((industry)=>industry.description)
    const industry_sentence = industry_descriptions.slice(0, -2).join(', ') +
        (industry_descriptions.slice(0, -2).length ? ', ' : '') +
        industry_descriptions.slice(-2).join(' and ')

    disclosures.forEach((disclosure)=>{

        const chat = {
            "chat_disclosure":disclosure,
            "chat_text": [
                        {
                            "role": "system",
                            "content": "Cody is a chat bot that specialized in writing accounting financial statement disclosure footnotes."
                        },
                        {
                            "role": "user",
                            "content": `Create an accounting disclosure regarding ${disclosure.topic.toLowerCase()} for a ${industry_sentence.toLowerCase()} Company`
                        }
                    ]
        }
        chats.push(chat)
    })

    return chats
}