import type { Config, Context } from "@netlify/edge-functions";

import {Configuration, OpenAIApi} from "https://esm.sh/openai@3.3.0"

export default async (req: Request, context: Context) => {

   const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
   });
  
   const openai = new OpenAIApi(configuration)

   const prompt = "A list of the 10 wealthiest persons in Japan and their net worth."
   
   async function main(prompt) {
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

  let answer = await main(prompt)
  return new Response(JSON.stringify({prompt:answer.body}), {
        headers: { "content-type": "application/json" 
      },
  });
  
}

export const config = { path: "/openai" };
