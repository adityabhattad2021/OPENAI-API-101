require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const multer = require("multer");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const API_KEY = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

// Will store the uploaded files in the public directory of the project.
const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'public')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const upload = multer({storage:storage}).single('file');
let filePath;

app.post("/images", async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: req.body.message,
      n: 5,
      size: "1024x1024",
    });
    console.log(response.data.data);
    res.send(response.data.data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/upload",(req,res)=>{
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError){
            return res.status(500).json(err)
        }else if(err){
            return res.status(500).json(err)
        }
        // console.log(req.file);
        filePath = req.file.path;
    })
})

app.post("/variations",async (req,res)=>{
  try{
    const response = await openai.createImageVariation(
      fs.createReadStream(filePath),
      5,
      "1024x1024"
    )
    console.log(response.data.data);
    res.send(response.data.data);
  }catch(error){
    console.log(error);
  }
})


app.listen(PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});
