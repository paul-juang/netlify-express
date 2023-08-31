const express = require('express');

const app = express();

const router = express.Router();

const serverless = require('serverless-http');

const cors = require('cors');

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

require('dotenv').config();

const bodyParser = require('body-parser');

const path = require('path');

const PORT = process.env.PORT || 3000;

//app.set
//app.set("view engine", "ejs");

//app.set("views", path.join(__dirname, "views"));


//middleware
app.use(cors());

app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, "../src"))); //public

app.use(express.urlencoded({extended: false}));

app.use(express.json());

//app.use('/.netlify/functions/server', router);  // path must route to lambda
//app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

//home page
app.get("/", (req, res) => {
  res.sendFile("index.html");
 });

app.get("/chatgpt",  (req, res) => {
  
  let prompt = req.query.prompt;
  
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
       console.log(answer)
        res.send(answer)
       } 
    catch(error) {
        console.log({error})
        res.json({error})
       }
    }

   chatGPT(prompt)

  })

module.exports = app;
//module.exports.handler = serverless(app);