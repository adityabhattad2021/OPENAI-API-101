require('dotenv').config()


console.log(process.env.OPENAI_API_KEY);

async function fetchData(){
    const response = await fetch("https://api.openai.com/v1/completions",{
        method:"POST",
        headers:{
            Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model:"text-davinci-003",
            prompt:"what is todays date?",
            max_tokens: 7,
            temperature:0.2
        })
    })
    const data = await response.json();
    console.log(data);
}


async function fetchChatData(){
    const response = await fetch("https://api.openai.com/v1/chat/completions",{
        method:"POST",
        headers:{
            Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{
                role:"user",
                content:"Hello..."
            }]
        })
    })
    const data = await response.json();
    console.log(data.choices);
}


// fetchChatData()
// fetchData()