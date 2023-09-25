import React, { useState } from 'react';

export default function Home(props) {

  const thisvalue = "How many languages have you mastered, and are you also " + 
  "knowledgeable about the subjects of Art, Literature, and History, "+
  "and well-versed in various fields of Science, such as Newtonian " + 
  "Physics, the theory of General Relativity, and Quantum Mechanics? " +
  "Please answer the above question in traditional Chinese and English."
  
  const thisvalue2 = "請問你能理解和使用多少種語言？你對藝術、文學和歷史等學科" +
  "也有研究嗎？即使牛頓物理學、廣義相對論和量子力學這些科學領域你也精通？" +
  "請用繁體中文和英文回答上述問題。"
  
  const [inputValue, setinputValue] = React.useState("")

  const [btndisabled, setbtndisabled] = React.useState(false)

  const handleChange = (e) => setinputValue(e.target.value)

  const handleClick = async () => {
    console.log("click from index.js")
    
    const promptValue = inputValue.trim()
    setinputValue('')

    let tempValue = ''
    let interval1 = setInterval(() => {
      tempValue += "."
      setinputValue(tempValue)
      if (tempValue === "...") tempValue = ""
     }, 300)
    
    let res = await fetch("/chatgpt", {
            method: 'POST', 
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                     'Access-Control-Allow-Headers': 'Authorization,Content-Type ',
                    },
                  body: JSON.stringify({ prompt: promptValue })
                  })
    console.log("res", res)

    let answer = await res.text();
    let answerText = answer;
    
        //let answer = await res.json();
        //let answerText = answer["prompt"];
        //let answerText = "status 204 no response from server"  //answer["prompt"];
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