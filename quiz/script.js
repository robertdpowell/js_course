const quizData = [
  {
    question: "How old is Gareth Bale?",
    a: "28",
    b: '30',
    c: '33',
    d: '35',
    correct: 'c'
  },
  {
    question: "Who scored the first goal for Wales vs Russia in 2016",
    a: "Sam Vokes",
    b: "Aaron Ramsey",
    c: "Hal Robson-Kanu",
    d: "Gareth Bale",
    correct: "b"
  }, 
  {
    question: "Which team does Danny Ward play for ",
    a: "Cardiff",
    b: "Swansea",
    c: "Leicester",
    d: "Liverpool",
    correct: "c"
  }, 
  {
    question: "What is CSS",
    a: "HTML",
    b: "JSON",
    c: "Cascading Style Sheet",
    d: "API",
    correct: "c"
  }
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

// this function loads a question, deselecting anything currently
// selected. It pulls the data from quizData and passes it into 
// html elements of the quiz structure.
function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}
// this function scans all of the answers to see which one is checked.
// when it finds a checked answer, it returns it as the answer...
function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
          answer = answerEl.id;
      }
  });

  return answer;
}
// this function deselects all answers.
function deselectAnswers() {
  answerEls.forEach((answerEl) => {
      answerEl.checked = false;
  });
}
// this function is called on click of the submit button, until end of the quiz.
// It grabs the answer value and compares it to the correct answer from quiz data.
// score is incremented by one if answer is correct. 
// when quiz end is reached (or number of questions exhausted), user is shown their score.
submitBtn.addEventListener("click", () => {
  // check to see the answer
  const answer = getSelected();

  if (answer) {
      if (answer === quizData[currentQuiz].correct) {
          score++;
      }

      currentQuiz++;
      if (currentQuiz < quizData.length) {
          loadQuiz();
      } else {
          quiz.innerHTML = `
              <h4>You answered correctly at ${score}/${quizData.length} questions.</h4>
              <button onclick="location.reload()">Reload</button>
          `;
      }
  }
});