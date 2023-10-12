import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default function handler(req,res) {

  let prompt = req.body.prompt;

  const chatGPT = async (prompt) => {

    try {
         const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"user", content:prompt}]
         })
        let answer = response["data"]["choices"][0]["message"]["content"]
        res.status(200).json({ prompt: answer})
       } 
    catch(error) {
        res.status(504).json({prompt:"504 Gateway Time-out. The server didn’t respond in time"})
       }
    }
   chatGPT(prompt)
}