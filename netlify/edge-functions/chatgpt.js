export default () => {
  let prompt = "Greetings from the Edge function!"
  return new Response(JSON.stringify({prompt}), {
    headers: { "content-type": "application/json" },
  });
};

export const config = { path: "/chatgpt" };

/**/

/*
import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => new Response('hello ok');

export const config: Config = {
  path: "/chatgpt",
};

*/



/*
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);
*/

/*
export default () => {

  //let prompt = req.body.prompt;
  const prompt = "A list of the 10 wealthiest Americans"
  
  const chatGPT = async (prompt) => {
    
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
        return new Response(JSON.stringify({prompt:answer}), {
           headers: { "content-type": "application/json" },
         });
       } 
    catch(error) {
        return new Response(JSON.stringify({prompt:"internal server error."}), {
           headers: { "content-type": "application/json" },
         });
      }
   chatGPT(prompt)
 }
 
};


export const config = { path: "/chatgpt" };
  */