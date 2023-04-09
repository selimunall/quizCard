const questionDocText = document.querySelector(".questionText");
const optionList = document.querySelector(".optionList");
let sya = 0;
let sya1 = 0;
let nextButton = document.querySelector(".next-button");
let card = document.querySelector(".card");
let btnStart = document.querySelector(".btn-start");
let questionQuantityDom = document.querySelector(".questionQuantity");

//define the question object in this section
function Question(questionText,questionAnswers,correctAnswer) {
    this.questionText = questionText;
    this.questionAnswers = questionAnswers;
    this.correctAnswer = correctAnswer;
}

//we define this part as control property
Question.prototype.controlAnswer = function(answer) {
    return  this.correctAnswer == answer
}

//we define questions inside an array
let questions = [
    new Question("1-Aşağıdakilerden hangisi bir enstrümandır?", { a: "İnek", b: "Damlatan musluk", c: "Kolçak" , d: "Düşen avize" }, "b"),
    new Question("2-Hangisi bir hayvandır?", { a: "Mööö", b: "İnek", c: "Ceviz", d: "Isırgan Otu" }, "a"),
    new Question("3-Hangisi javascript paket yönetim uygulamasıdır?", { a: "Node.js", b: "Typescript", c: "Npm" }, "c"),
    new Question("4-Hangisi bir özgürlüktür?", { a: "Yurtdışına çıkmak", b: "Köye gitmek", c: "Türkiyede kalmak", d: "Dans etmek" }, "c")
];

//we define the quiz object to raise a question
function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
}

//we define property to get the question
Quiz.prototype.getQuestion = function() {
    return this.questions[this.questionIndex]
}


const quiz = new Quiz(questions); 



//this event lists the events that will happen after clicking "btn-start"
btnStart.addEventListener("click", () => {
    card.classList.add("active")
    showQuestion(quiz.getQuestion());
    chechkUp();
    showNextButton();
    showQuestionQuantity();
})

//this event lists the events that will happen after clicking "nextButton"
nextButton.addEventListener("click", () => {
    if(quiz.questionIndex + 1 != questions.length  ){
        quiz.questionIndex += 1;
        showQuestion(quiz.getQuestion());
        chechkUp();
        sya = 0;
        showNextButton();
        showQuestionQuantity();
    } else {
        console.log("Sinav bitmistir")
    }
    
    
})

//print to screen function
function showQuestion(question) {
    questionDocText.innerHTML = `<span>${question.questionText}</span>`
    let a = ``

    for (let b in question.questionAnswers) {
        a += `
            <div class="option p-2 w-full rounded-md border border-black md:hover:bg-yellow-200 cursor-pointer">
                <span class="p-2">
                    <b>${b}</b>: ${question.questionAnswers[b]}
                </span>
            </div>
        `
    }

    optionList.innerHTML = a;
}

//Once the questions are loaded, we add an onClick property for each question
function chechkUp() {
    document.querySelectorAll(".option").forEach( name => {
        name.setAttribute("onClick", "optionClick(this)" )
    })  
}

//With this function we check if the given answer is correct.
function optionClick(t) {
    
    if (questions[quiz.questionIndex].controlAnswer(t.children[0].children[0].innerHTML) ){
        t.classList.add("bg-green-400");
    } else {
        t.classList.add("bg-red-400");
    }
    sya = 1;
    showNextButton();  
    lockClick();
}

//this function hides or shows "nextButton"
function showNextButton() {
    if (sya == 0) {
        nextButton.classList.add("opacity-0","cursor-default")
    } else {
        nextButton.classList.remove("opacity-0","cursor-default")
    }
}

//we use this function to lock the click event
function lockClick() {
    document.querySelectorAll(".option").forEach( name => {
        name.removeAttribute("onClick");
    })
}

//we use this function to show the question quantity 
function showQuestionQuantity() {
    questionQuantityDom.innerHTML = `${quiz.questionIndex + 1} / ${questions.length}`;
}

//
