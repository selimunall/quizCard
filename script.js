const questionDocText = document.querySelector(".questionText");
const optionList = document.querySelector(".optionList");
const nextButton = document.querySelector(".next-button");
const card = document.querySelector(".card");
const btnStart = document.querySelector(".btn-start");
const questionQuantityDom = document.querySelector(".questionQuantity");
const resultDiv = document.querySelector(".resultDom");
const timerDom = document.querySelector(".timerSecond");
const resultBox = document.querySelector(".result");
const lineDiv = document.querySelector(".lineDiv");
let interval;
let counter;
let sya = 0;
let sya1 = 0;
let correctAnswerSya = 0;

//define the question object in this section
function Question(questionText, questionAnswers, correctAnswer) {
  this.questionText = questionText;
  this.questionAnswers = questionAnswers;
  this.correctAnswer = correctAnswer;
}

//we define this part as control property
Question.prototype.controlAnswer = function (answer) {
  return this.correctAnswer == answer;
};

//we define questions inside an array
let questions = [
  new Question(
    "1-Aşağıdakilerden hangisi bir enstrümandır?",
    { a: "İnek", b: "Damlatan musluk", c: "Kolçak", d: "Düşen avize" },
    "b"
  ),
  new Question(
    "2-Hangisi bir hayvandır?",
    { a: "Mööö", b: "İnek", c: "Ceviz", d: "Isırgan Otu" },
    "a"
  ),
  new Question(
    "3-Hangisi javascript paket yönetim uygulamasıdır?",
    { a: "Node.js", b: "Typescript", c: "Npm" },
    "c"
  ),
  new Question(
    "4-Hangisi bir özgürlüktür?",
    {
      a: "Yurtdışına çıkmak",
      b: "Köye gitmek",
      c: "Türkiyede kalmak",
      d: "Dans etmek",
    },
    "c"
  ),
];

//we define the quiz object to raise a question
function Quiz(questions) {
  this.questions = questions;
  this.questionIndex = 0;
}

//we define property to get the question
Quiz.prototype.getQuestion = function () {
  return this.questions[this.questionIndex];
};

const quiz = new Quiz(questions);

//this event lists the events that will happen after clicking "btn-start" ????????
btnStart.addEventListener("click", start);
function start() {
  card.classList.add("active");
  showQuestion(quiz.getQuestion());
  chechkUp();
  showNextButton();
  showQuestionQuantity();
  startTimer(10);
  lineAnimation();
}

//this event lists the events that will happen after clicking "nextButton" ????????
nextButton.addEventListener("click", () => {
  if (quiz.questionIndex + 1 != questions.length) {
    quiz.questionIndex += 1;
    showQuestion(quiz.getQuestion());
    chechkUp();
    sya = 0;
    showNextButton();
    showQuestionQuantity();
    timerDom.innerHTML = "";
    startTimer(10);
    lineAnimation();
    quiz.questionIndex == questions.length - 1
      ? ss()
      : console.log("questions continue");
  } else {
    console.log("Sinav bitmistir");
    resultShow();
    clearInterval(interval);
    clearInterval(counter);
    console.log(correctAnswerSya);
  }
});
function ss() {
  nextButton.innerHTML = "Sonucu Goster";
}

//print to screen function
function showQuestion(question) {
  questionDocText.innerHTML = `<span>${question.questionText}</span>`;
  let a = ``;

  for (let b in question.questionAnswers) {
    a += `
            <div class="option p-2 w-full rounded-md border border-black md:hover:bg-yellow-200 cursor-pointer">
                <span class="p-2">
                    <b>${b}</b>: ${question.questionAnswers[b]}
                </span>
            </div>
        `;
  }

  optionList.innerHTML = a;
}

//Once the questions are loaded, we add an onClick property for each question
function chechkUp() {
  document.querySelectorAll(".option").forEach((name) => {
    name.setAttribute("onClick", "optionClick(this)");
  });
}

//With this function we check if the given answer is correct.
function optionClick(t) {
  if (
    questions[quiz.questionIndex].controlAnswer(
      t.children[0].children[0].innerHTML
    )
  ) {
    t.classList.add("bg-green-400");
    correctAnswerSya += 1;
  } else {
    t.classList.add("bg-red-400");
  }
  sya = 1;
  showNextButton();
  lockClick();
  clearInterval(interval);
  clearInterval(counter);
}

//this function hides or shows "nextButton"
function showNextButton() {
  if (sya == 0) {
    nextButton.classList.add("opacity-0", "cursor-default");
  } else {
    nextButton.classList.remove("opacity-0", "cursor-default");
  }
}

//we use this function to lock the click event
function lockClick() {
  document.querySelectorAll(".option").forEach((name) => {
    name.removeAttribute("onClick");
  });
}

//we use this function to show the question quantity
function showQuestionQuantity() {
  questionQuantityDom.innerHTML = `${quiz.questionIndex + 1} / ${
    questions.length
  }`;
}

//we use this function to show the results of answers
function resultShow() {
  resultBox.classList.remove("hidden");
  resultBox.classList.add("active");
  card.classList.remove("active");
  resultDiv.innerHTML = `Tebrikler  ${questions.length} soruluk testte  ${correctAnswerSya} soru yaptiniz. :)`;
  sya = 0;
  clearInterval(interval);
  clearInterval(counter);
}

//we use this function to start again
function againStart() {
  correctAnswerSya = 0;
  quiz.questionIndex = 0;
  nextButton.innerHTML = "Sonraki Soru";
  resultBox.classList.remove("active");
  card.classList.add("active");
  sya = 0;
  start();
}

//we use to call timer
function startTimer(time) {
  let tt = time - 1;
  timerDom.innerHTML = time;
  interval = setInterval(timer, 1000);
  function timer() {
    timerDom.innerHTML = tt;
    if (tt == 0) {
      console.log("Sure bitti");
      sya = 1;
      clearInterval(interval);
      clearInterval(counter);
      showNextButton();
      lockClick();
      for (let optin of optionList.children) {
        if (
          optin.querySelector("span b").textContent ==
          questions[quiz.questionIndex].correctAnswer
        ) {
          optin.classList.add("bg-green-400");
        }
      }
    }
    tt -= 1;
  }
}

//we use to start line animation
function lineAnimation() {
  let wid = 0;
  let second = 0;
  counter = setInterval(line, 20);
  function line() {
    second += 1 / 50;
    if (card.offsetWidth == 300) {
      wid = (card.offsetWidth / 10) * second;
    } else {
      wid = (card.offsetWidth / 10) * second;
    }
    lineDiv.style.width = wid + "px";
    wid += card.offsetWidth / 500;
  }
}