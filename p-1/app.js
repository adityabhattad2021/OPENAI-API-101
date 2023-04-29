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


async function fetchImage(){
    const response = await fetch("https://api.openai.com/v1/images/generations",{
        method:"POST",
        headers:{
            Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            prompt:"Create an image of a delicious and visually appealing brownie pizza with a chocolate-based crust and a variety of chocolate toppings. The pizza should be presented on a rustic wooden surface and cut into slices, with a melted chocolate drizzle cascading over the top. The toppings should include a mix of chocolate chips, cocoa powder, and other decadent treats, such as fudge chunks, whipped cream, and chocolate shavings. The overall image should make the viewer's mouth water and evoke a strong desire to take a bite of the rich and indulgent dessert.",
            n:2,
            size:"1024x1024"
        })
    })
    const data = await response.json();
    console.log(data);
}

// fetchChatData()
// fetchData()
fetchImage()