//chatGPT-OpenAi
console.log("chatgptx")
document.addEventListener('DOMContentLoaded', () => {
  const prompt = document.querySelector("#prompt");

  prompt.addEventListener("keyup", () => button.disabled = false)

  const button = document.querySelector("#btn")

  button.addEventListener("click", async function(e) {
    e.preventDefault()
    
    const promptValue = prompt.value.trim()+"\r\n";
    prompt.value = "";
    prompt.placeholder = "";

    let interval1 = setInterval(() => {
      prompt.value += ".";
      if (prompt.value === "....") prompt.value = ""
    }, 300)
    
    let res = await fetch(`/chatgpt?prompt=${promptValue}`, {
                  method: 'GET', 
                  headers: {
                     'Content-Type': 'application/json'
                    }
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
