const questionNumber=document.querySelector(".question-number");
const question= document.querySelector(".question");
const optionContainer= document.querySelector(".option-container");

let questionCounter=0;
let currentQuestion;
let availableQuestion=[];
let availableOptions=[];

function setAvailableQuestions(){
    const totalQuestion= questions.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestion.push(questions[i]);
    }
}

//Sets question number, question and options
function getNewQuestion(){
    //Setting Q.No.
    questionNumber.innerHTML= (questionCounter+1) + "| 5";

    //Setting question
    const questionIndex=availableQuestion[Math.floor(Math.random()*availableQuestion.length)];
    currentQuestion=questionIndex;
    question.innerHTML=currentQuestion.question;

    const index1=availableQuestion.indexOf(questionIndex);
    
    //To remove the questionIndex from availableQuestion array. (To avoid repetition of question.)
    availableQuestion.splice(index1, 1);

    //Setting Options
    const optionLength= currentQuestion.options.length;
    for(let i=0; i<optionLength; i++){
        availableOptions.push(i);
    }
    for(let i=0; i<optionLength; i++){
        const option = document.createElement("div");
        option.innerHTML=currentQuestion.options[i];
        option.id=i;
        option.className="option";
        optionContainer.append(option);
    }
    questionCounter++;
}

function next(){
    if(questionCounter===questions.length){
        console.log("Quiz is Over.")
    }else{
        getNewQuestion();
    }
}

window.onload=function(){
    setAvailableQuestions();    //Setting questions in array
    getNewQuestion();
}