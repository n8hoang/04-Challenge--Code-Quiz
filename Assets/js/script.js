/**
 * DOM ELEMENTS
 */
const start = document.getElementById("start");
const startBtn = document.getElementById("start-btn");
const questionAnswers = document.getElementById("question-div");
const questionTitle = document.getElementById("question-title");
const timer = document.getElementById("timer");
const timeLeft = document.getElementById("time-left");
const timesUp = document.getElementById("times-up");
const choiceA = document.getElementById("choice-a");
const choiceB = document.getElementById("choice-b");
const choiceC = document.getElementById("choice-c");
const choiceD = document.getElementById("choice-d");
const checkAns = document.getElementById("answer-check");
const scoreSummary = document.getElementById("score-summary");
const submitHighscore = document.getElementById("submit-initial");
const initialInput = document.getElementById("initial-input");
const everything = document.getElementById("everything");
const highscoreSection = document.getElementById("highscore-section");
const finalScore = document.getElementById("final-score");
const goBack = document.getElementById("goback-btn");
const clear = document.getElementById("clear-btn");
const viewHighscore = document.getElementById("view-highscores");
const highscoreList = document.getElementById("highscore-list");

const questions = [
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["A. var", "B. let", "C. Both A and B", "D. None of the above"],
        answer: "C. Both A and B"
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["A. GetElementbyId() ", "B. getElementsByClassName() ", "C. Both A and B", "D. None of the above "],
        answer: "C. Both A and B"
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        choices: ["A. const", "B. var", "C. let", "D. constant"],
        answer: "A. const"
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["A. document.write()", "B. console.log()", "C. window.alert()", "D. All of the above"],
        answer: "D. All of the above"
    },
    {
        question: "Which built-in method reverses the order of the elements of an array?",
        choices: ["A. changeOrder(order)", "B. reverse()", "C. sort(order)", "D. None of the above"],
        answer: "B. reverse()"
    },
    {
        question: "Which of the following function of String object creates an HTML anchor that is used as a hypertext target?",
        choices: ["A. anchor()", "B. link()", "C. blink()", "D. big()"],
        answer: "A. anchor()"
    },
    {
        question: "Which of the following function of Array object calls a function for each element in the array?",
        choices: ["A. concat()", "B. every()", "C. filter()", "D. forEach()"],
        answer: "D. forEach()"
    },
    {
        question: "JavaScript is a ____- side programming language.",
        choices: ["A. Client", "B. Server", "C. Both", "D. None"],
        answer: "A. Client"
    },
    {
        question: "How do you find the minimum of x and y using JavaScript?",
        choices: ["A. min(x,y);", "B. Math.min(x,y)", "C. Math.min(xy)", "D. min(xy);"],
        answer: "B. Math.min(x,y)"
    },
    {
        question: "Which JavaScript label catches all the values, except for the ones specified?",
        choices: ["A. catch", "B. label", "C. try", "D. default"],
        answer: "D. default"
    }
];
// Other global variables and functions remain the same
let questionIndex;
let correctAnswer = 0;
let questionNum = 0;
let timeTotal;

/**
 * MAIN GAME FUNCTIONS
 */
function startQuiz() {
    questionIndex = 0;
    timeTotal = 60;
    timeLeft.textContent = timeTotal;
    initialInput.textContent = "";
    start.style.display = "none";
    questionAnswers.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";
    startTimer();
    nextQuestion();
};

function startTimer() {
    var startTimer = setInterval(function() {
        timeTotal--;
        timeLeft.textContent = timeTotal;
        if(timeTotal <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
};


function handleChoiceClick(event) {
    if (event.target.nodeName === "BUTTON") {
        checkAnswer(event.target.dataset.choiceIndex);
    }
}

function checkAnswer(choiceIndex) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    checkAns.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[choiceIndex]) {
        correctAnswer++;
        checkAns.textContent = "Correct!";
    } else {
        // If answer is wrong deduct 5 from timeTotal.
        timeTotal -= 5;
        timeLeft.textContent = timeTotal;
        checkAns.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
};

function gameOver() {
    scoreSummary.style.display = "block";
    questionAnswers.style.display = "none";
    start.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    // show final score
    finalScore.textContent = correctAnswer;
}

//High Score
function storeHighscores(event) {
    event.preventDefault();

    if (initialInput.value === "") {
        alert("Enter your initials!");
        return;
    } 

    start.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    scoreSummary.style.display = "none";
    highscoreSection.style.display = "block";   
    var savedHighscores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighscores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighscores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    scoresArray.push(userScore);
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    showHighscores();
}

function showHighscores() {

    start.style.display = "none";
    timer.style.display = "none";
    questionAnswers.style.display = "none";
    timesUp.style.display = "none";
    scoreSummary.style.display = "none";
    highscoreSection.style.display = "block";

    var savedHighscores = localStorage.getItem("high-scores");

    if (savedHighscores === null) {
        return;
    }

    var storedHighscores = JSON.parse(savedHighscores);

    for (let i = 0; i < storedHighscores.length; i++) {
        var eachNewHighscore = document.createElement("p");
        eachNewHighscore.innerHTML = storedHighscores[i].initials + ": " + storedHighscores[i].score;
        highscoreList.appendChild(eachNewHighscore);
    }
}

function clearHighscores() {
    window.localStorage.removeItem("high-scores");
    highscoreList.innerHTML = "High Scores Cleared!";
    highscoreList.style.color = "red";
}

function goBackFunction () {
    start.style.display = "block";
    highscoreSection.style.display = "none";
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("choice-container").addEventListener("click", handleChoiceClick);
document.getElementById("submit-initial").addEventListener("click", storeHighscores);
document.getElementById("view-highscores").addEventListener("click", showHighscores);
document.getElementById("goback-btn").addEventListener("click", goBackFunction);
document.getElementById("clear-btn").addEventListener("click", clearHighscores);

/**
 * INITIALIZATION
 */
function init() {
    timesUp.style.display = "none";
    timer.style.display = "none";
}
init();
