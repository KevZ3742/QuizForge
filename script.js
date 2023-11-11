async function getQuestions(text, count){

  let questions;
const resp = await fetch("http://localhost:9002/generate", {
  method: "POST",
  body: JSON.stringify({
    text: text,
    count: count
}),
});

questions = await resp.json();

  return questions;
}

async function generateQuestions(text, count){
  let questions = await getQuestions(text, count);
  console.log(questions);
  for (let question in questions) {
    let questionDiv = document.createElement("div");
    questionDiv.className = "question";
    question = (JSON.parse(questions[question]));
    
    let questionText = document.createElement("p");

    questionText.innerHTML = question.questionText;

    let answerOptionsDiv = document.createElement("div");

    answerOptionsDiv.className = "answerOptions";


    correctAnswer_ind = Math.floor(Math.random() * (question.distractors.length+1)); 
    putCorrectAnswer = false;

    for (let answerOption in question.distractors) {
      if(answerOption == correctAnswer_ind) {
        var newRadioButton = document.createElement("input")
      
        newRadioButton.setAttribute("type", "radio");
        
        newRadioButton.setAttribute("name", answerOption);
        newRadioButton.setAttribute("value", "Y");
        var lbl = document.createElement("label");
        lbl.innerHTML = question.answerText;
        answerOptionsDiv.appendChild(newRadioButton);
        answerOptionsDiv.appendChild(lbl);
        putCorrectAnswer = true;
      }
      var newRadioButton = document.createElement("input")
      
      newRadioButton.setAttribute("type", "radio");
      
      newRadioButton.setAttribute("name", answerOption);
      newRadioButton.setAttribute("value", "N");
   
      var lbl = document.createElement("label");
      lbl.innerHTML = question.distractors[answerOption];
      

      answerOptionsDiv.appendChild(newRadioButton);
      answerOptionsDiv.appendChild(lbl);

    }

    if(!putCorrectAnswer){
      var newRadioButton = document.createElement("input")
      
      newRadioButton.setAttribute("type", "radio");
      
      newRadioButton.setAttribute("name", correctAnswer_ind);
      newRadioButton.setAttribute("value", "Y");
      var lbl = document.createElement("label");
      lbl.innerHTML = question.answerText;
      answerOptionsDiv.appendChild(newRadioButton);
      answerOptionsDiv.appendChild(lbl);
    }
    questionDiv.appendChild(questionText);
    questionDiv.appendChild(answerOptionsDiv);

    
    
    document.getElementById("questions").appendChild(questionDiv);
  }

}

document.getElementById("generateButton").onclick = function () { generateQuestions("Print hellow world", 2) } ;

document.getElementById("printButton").onclick = function () {window.print()};