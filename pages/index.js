import React, { useState } from 'react';

export default function Home(props) {

  const thisvalue = "How many languages have you mastered, and are you also " + 
  "knowledgeable about the subjects of Art, Literature, and History, "+
  "and well-versed in various fields of Science, such as Newtonian " + 
  "Physics, the theory of General Relativity, and Quantum Mechanics? " +
  "Please answer the above question in traditional Chinese and English."
  
  const thisvalue2 = "請問你能理解和使用多少種語言？你對藝術、文學和歷史等學科" +
  "也有研究嗎？甚至牛頓物理學、廣義相對論和量子力學這些科學領域你也精通？" +
  "請用繁體中文和英文回答上述問題。"
  
  const thisvalue3 = thisvalue2 + "\r\n" + "\r\n" +
  "我是一個人工智慧語言模型，我能夠理解和使用多種語言，包括繁體中文和英文。我能夠協助回" +
  "答關於藝術、文學和歷史等學科的問題，但我的知識是基於訓練數據的，並非擁有實際的" +
  "研究能力。至於牛頓物理學、廣義相對論和量子力學等科學領域，我有關於這些主題的基本"+
  "知識，但不代表我精通這些領域。如果你有相關問題，我將盡力提供幫助和資訊。" + "\r\n" + "\r\n" +
  "I am an AI language model capable of understanding and using multiple "+
  "languages, including Traditional Chinese and English. I can assist in "+
  "answering questions related to subjects like art, literature, and " +
  "history, but my knowledge is based on training data and not on actual "+
  "research expertise. As for scientific fields like Newtonian physics, "+
  "general relativity, and quantum mechanics, I have basic knowledge about "+
  "these topics but I wouldn't claim to be an expert. I'll do my best to "+
  "provide help and information if you have any relevant queries."

  const [inputValue, setinputValue] = React.useState("")

  const [btndisabled, setbtndisabled] = React.useState(false)

  const handleChange = (e) => setinputValue(e.target.value)

  const handleClick = async () => {
    const promptValue = inputValue.trim()
    setinputValue('')

    let tempValue = ''
    let interval1 = setInterval(() => {
      tempValue += "."
      setinputValue(tempValue)
      if (tempValue === "...") tempValue = ""
     }, 300)
    
    let res = await fetch("/api/chatgpt", {
            method: 'POST', 
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                     'Access-Control-Allow-Headers': 'Authorization,Content-Type ',
                    },
                  body: JSON.stringify({ prompt: promptValue })
                  })
    
        let answer = await res.json();
        let answerText = answer["prompt"];
        clearInterval(interval1);

        setinputValue('')

        let finalText = promptValue +"\r\n"+"\r\n"+answerText

        let index = 0;
        let tempValue2 = ''
        let interval2 = setInterval(() => {
             if (index < finalText.length) {
              tempValue2 += finalText.charAt(index);
              setinputValue(tempValue2)
              index++
             } else {
              clearInterval(interval2)
             }  
        }, 20)
    }

  return (
      <>
        <h3>ChatGPT</h3>
        <h3>OpenAI 人工智慧 - 精通各國語言並知天下事</h3>
        <textarea 
          value={inputValue} 
          onChange= {handleChange}
          placeholder= {thisvalue3}
          id="prompt" rows="12" cols="40" resizeable="true">
        </textarea>
        <button 
            onClick = {handleClick}  id="btn" 
            disabled = {btndisabled ? true : false}>
            <i className="fas fa-paper-plane"></i>
        </button>
      </>
    )
  }