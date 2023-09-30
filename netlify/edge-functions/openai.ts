import type { Config, Context } from "@netlify/edge-functions";

import {Configuration, OpenAIApi} from "https://esm.sh/openai@3.3.0"

export default async (req: Request, context: Context) => {

//export default async (req, context) => {
console.log("req.method", req.method)

console.log("req.body", req.body)

let res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
let data = await res.json()
console.log("parsed req.body", data); 

  //

   const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
   });
  
   const openai = new OpenAIApi(configuration)

   const prompt = "請問你能理解和使用多少種語言？你對藝術、文學和歷史等學科也有研究嗎？即使牛頓物理學、廣義相對論和量子力學這些科學領域你也精通？請用英文和繁體中文回答上述問題。"
   //   const prompt = "a list of the top 10 box-office movies in 2021"

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

export const config = { path: "/openai" };
