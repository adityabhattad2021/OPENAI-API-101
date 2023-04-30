import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

const API_KEY: string | undefined = process.env.OPENAI_API_KEY;
const PORT: number = parseInt(process.env.PORT || "3000", 10);

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openAI = new OpenAIApi(configuration);

app.post("/generate", async (req: Request, res: Response) => {
  try {
    const completion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are SQLHelper, You only generate SQL querys based on the given prompt.",
        },
        {
          role: "user",
          content: `Create a SQL Query for: ${req.body.message}`,
        },
      ],
    });
    res.send(completion.data.choices[0].message);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`The App is running on PORT ${PORT}`);
});
