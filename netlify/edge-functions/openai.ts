import type { Config, Context } from "@netlify/edge-functions";

import {Configuration, OpenAIApi} from "https://esm.sh/openai@3.3.0"

export default async (req: Request, context: Context) => {
/*
let res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
let data = await res.json()
console.log("parsed req.body", data); 
*/
   const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
   });
  
   const openai = new OpenAIApi(configuration)

   const prompt = "A list of the 10 wealthiest persons in France and their net worth. Please answer the question in French."

   async function chatgpt(prompt) {
     
     try {
         const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"user", content:prompt}]
         })
        let answer = response["data"]["choices"][0]["message"]["content"]
        return { statusCode: 200, body: answer};
     } 

    catch(error) {
        let answer = "internal server error"
        return { statusCode: 500, body: error};
     }

  }

  let answer = await chatgpt(prompt)
  return new Response(JSON.stringify({prompt:answer.body}), {
        headers: { "content-type": "application/json" 
      },
  });
  
}

export const config = { path: "/openai" }