//chatGPT-OpenAi
document.addEventListener('DOMContentLoaded', () => {
  const formElement = document.querySelector("form");
  //const chatContainer = document.querySelector("#chat-container");
  const prompt = document.querySelector("#prompt");

  prompt.addEventListener("keyup", () => button.disabled = false)

  const button = document.querySelector("#btn")

  button.addEventListener("click", async function(e) {
    e.preventDefault()
    console.log("button click")
    
    const promptValue = prompt.value.trim()+"\r\n";
    prompt.value = "";

    let interval1 = setInterval(() => {
      prompt.value += ".";
      if (prompt.value === "....") prompt.value = ""
    }, 300)
    
    let res = await fetch("/chatGPT", {
            method: 'POST', 
                  headers: {
                     'Content-Type': 'application/json'
                    },
                  body: JSON.stringify({ prompt: promptValue })
                  })

        let answer = await res.json();
        let answerText = answer["answer"];

        clearInterval(interval1);

        prompt.value = "";

        let finalText = promptValue+answerText

        index = 0;

        let interval2 = setInterval(() => {
             if (index < finalText.length) {
              prompt.value += finalText.charAt(index);
              index++
             } else {
              clearInterval(interval2)
             }  
        }, 20)

    })
  
})
