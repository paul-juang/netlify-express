exports.handler = async function (event, context) {
return {
    statusCode: 200,
    body: "Hello, greeting from Netlify!"
    };
};

/*
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);
*/

/*
exports.handler =  function (event, context) {

  //let prompt = req.body.prompt;
  const prompt = "A list of the 10 wealthiest Americans"
  
  const chatGPT = async (prompt) => {
   console.log("get here in handler OK")
   const { Configuration, OpenAIApi } = require("openai")

   const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
   });

   const openai = new OpenAIApi(configuration)
      
    try {
         const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"user", content:prompt}]
         })
        let answer = response["data"]["choices"][0]["message"]["content"]
        console.log("answer", answer)
        return {
            statusCode: 200,
            body: answer
         }
        //res.status(200).json({ prompt: answer})
       } 
    catch(error) {
        return {
            statusCode: 500,
            body: "internal server error"
         }
      }
   chatGPT(prompt)
 }

}
*/
