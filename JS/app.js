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
    optionContainer.innerHTML='';
    let animationDelay=0.25;
    for(let i=0; i<optionLength; i++){

        //To randomly view the options
        const optionIndex=availableOptions[Math.floor(Math.random()*availableOptions.length)];
        
        //Get the position of the option index
        const index2=availableOptions.indexOf(optionIndex); 

        //Remove the already present option from available options so that the options do not repeat
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML=currentQuestion.options[optionIndex];
        option.id=optionIndex;
        option.style.animationDelay=animationDelay + 's';
        animationDelay=animationDelay+0.25;
        option.className="option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++;
}

function getResult(optionElement){
    const id= parseInt(optionElement.id);   //Since id is int, and option is string...
    if(id===currentQuestion.answer){
        optionElement.classList.add("correct"); //to add green bg to correct ans
        console.log("Correct Answer");
    }else{
        optionElement.classList.add("incorrect");   //to add red bg to incorrect ans
        console.log("Incorrect Answer");

        //To display green background color to the correct option, if selected is wrong
        const optionLen=optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id)===currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    unclickableOptions();
}

//To make the remaining options unclickable after one is selected
function unclickableOptions(){
    const optionLen= optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
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