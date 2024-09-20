///References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
//Questions and Options array
const quizArray = [
  {
    id: "1",
    question: "Hazrat Usman (RA) was ___ Caliph.?",
    options: ["1st", "2nd", "3rd", "4th"],
    correct: "3rd",
  },
  {
    id: "2",
    question: "Shaikh Abdul Qadir Jilani is buried in?",
    options: ["Baghdad", "Asia", "Multan", "Tehran"],
    correct: "Baghdad",
  },
  {
    id: "3",
    question: "Musaylimah was?",
    options: ["Poet", "philosopher", "False Prophet", "None of these"],
    correct: "False Prophet",
  },
  {
    id: "4",
    question: "Saifullah was the title of?",
    options: ["Hazrat Khalid r.a", "Hazrat Umar r.a", "Hazrat Ali r.a", "None of these"],
    correct: "Hazrat Khalid r.a",
  },
  {
    id: "5",
    question: "Which Surah is known as Heart of Quran?",
    options: ["Surah Fatiha", "Surah Kausar", "Surah Yaseen", "None of these"],
    correct: "Surah Yaseen",
  },
  {
    id: "6",
    question: "Prophet Yousuf A.S and Prophet Yaqoob A.S met each other after ___ years?",
    options: [35, 40, 45, 50],
    correct: 40,
  },
  {
    id: "7",
    question: "How many days event feel occur before birth of Holy prophet Muhammad SAW?",
    options: ["50-55 days" , "60-65 days" , "30-35 days" , "20-25 days"],
    correct: "50-55 days",
  },
  {
    id: "8",
    question: "Hazrat Abu Bakr (R.A) belonged to the tribe of ___?",
    options: ["Banu Hashim", "Banu Taym", "Banu Sahm", "None of these"],
    correct: "Banu Taym",
  },
  {
    id: "9",
    question: "During Which prayer, the change of Qibla happened?",
    options: ["Zuhr", "Fajr", "Magrib", "Asar"],
    correct: "Zuhr",
  },
  {
    id: "10",
    question: "Hazrat Musa (A.S) met with Holy Prophet ﷺ on the __ heaven?",
    options: ["7th", "6th", "3rd", "4th"],
    correct: "6th",
  },
];
//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 16;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);
//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML =`${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};
//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");
  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}
//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}
//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});
//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};