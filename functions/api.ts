const express = require('express');

const api = express();

const router = express.Router();

const serverless = require('serverless-http');

const cors = require('cors');

require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const bodyParser = require('body-parser');

const path = require('path');

//const PORT = process.env.PORT || 3000;

//app.set
//api.set("view engine", "ejs");

//api.set("views", path.join(__dirname, "views"));

//middleware
api.use(cors());

api.use(express.static(__dirname));

api.use(express.static(path.join(__dirname, "../src"))); //public

api.use(express.urlencoded({extended: false}));

api.use(express.json());

//home page
router.get("/", (req, res) => {
  res.sendFile("../src/index.html");
});

router.post("/chatGPT", async (req, res) => {

  let prompt = req.body.prompt;
  
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  const chatGPT = async (prompt) => {
    try {
         const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"user", content:prompt}]
         })
        let answer = response["data"]["choices"][0]["message"]["content"]
        res.json({answer})
       } 
    catch(error) {
        console.log({error})
        res.json({error})
       }
    }

   chatGPT(prompt)

  })

api.use('/.netlify/functions/', router);

export const handler = serverless(api);
//module.exports = app;
//module.exports.handler = serverless(app);