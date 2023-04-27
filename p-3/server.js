const PORT = process.env.PORT;
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/completions", async (req, res) => {
//   console.log("req.body :", req.body);
//   console.log(req.body.prevChats);
  let cleanArray = [];
  if (req.body.prevChats.length > 0) {
    for (let x = 0; x < req.body.prevChats.length; x++) {
        cleanArray.push({
            role:req.body.prevChats[x].role,
            content:req.body.prevChats[x].content
        })
    }
  }
//   console.log(cleanArray);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are reactGPT, a large language model trained by OpenAI. Answer as concisely as possible.\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-03-02",
        },...cleanArray,
        { role: "user", content: req.body.message },
      ],
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});
