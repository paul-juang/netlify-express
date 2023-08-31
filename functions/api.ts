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
  res.sendFile("index.html");
});


router.("/chatgpt",  (req, res) => {

  //let prompt = "A list of the most famous generals in the Civil War.";
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
        
        res.text(answer)
       } 
    catch(error) {
        res.json({error})
       }
    }

   chatGPT(prompt)

  })
api.use('/api/', router);
export const handler = serverless(api);

//api.use('/.netlify/functions/api', router);
//module.exports.handler = serverless(api);
