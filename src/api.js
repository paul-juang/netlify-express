//express on netlify
const express = require('express');
const app = express();

const cors = require('cors');

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

require('dotenv').config();

const path = require('path');

const bodyParser = require('body-parser');

//const PORT = process.env.PORT || 3000;

//app.set
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(cors());

const router = express.Router();

app.use('/.netlify/functions/server', router);  // path must route to lambda
//app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

//home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
});

app.post("/chatGPT", async (req, res) => {

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
        res.send(answer)
       } 
    catch(error) {
        console.log({error})
        res.send({error})
       }
    }

   chatGPT(prompt)

  })
  
//app.listen(PORT, () => {
//    console.log('Server listening on ' + PORT);
//});

//module.exports = app;
module.exports.handler = serverless(app);