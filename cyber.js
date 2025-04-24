const questions = [
    {
        question: "Tushar ki kitni gf reh chuki h?",
        answers: [
            {text:"Ek", correct:"false"},
            {text:"Ek se zyada", correct:"false"},
            {text:"10", correct:"true"},
            {text:"Bhai single h", correct:"false"},
        ]
    },
    {
        question: "Arish ka fav time pass?",
        answers: [
            {text:"Sona", correct:"true"},
            {text:"Gym krna", correct:"true"},
            {text:"Ladki ghumana", correct:"true"},
            {text:"Hasna", correct:"true"},
        ]
    },
    {
        question: "Prashil college kyun nhi aata h?",
        answers: [
            {text:"Pasand nhi h", correct:"false"},
            {text:"Ladkibaazi krte h isliye", correct:"true"},
            {text:"Aaraam pasand h", correct:"false"},
            {text:"Ese hi", correct:"false"},
        ]
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    });
}

function resetState(){
    nextButton.style.display='none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct');
        }
        button.disabled = 'true';
    });
    nextButton.style.display='block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored '+score+ ' out of '+ questions.length;
    nextButton.innerHTML='Play Again?';
    nextButton.style.display='block';
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
