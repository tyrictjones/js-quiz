var quizBank = [
    {
        id: 0,
        question: 'Which keyword will not allow you to create a new variable?',
        choices: [
            {text: 'var', correct: 0}, //1 is correct, 0 is incorrect
            {text: 'let', correct: 0},
            {text: 'command', correct: 1},
            {text: 'const', correct: 0},
        ]
    },
    {
        id: 1,
        question: 'Which of the following is a boolean value?',
        choices: [
            {text: '"cat"', correct: 0},
            {text: 'false', correct: 1},
            {text: '3.14', correct: 0},
            {text: '-100', correct: 0},
        ]
    },
    {
        id: 2,
        question: 'Third question in the quiz?',
        choices: [
            {text: 'first choice', correct: 1},
            {text: 'second choice', correct: 0},
            {text: 'third choice', correct: 0},
            {text: 'fourth choice', correct: 0},
        ]
    }
];

//capture each of the divs in the main section so that we can hide/display them as needed
var welcomeEl = document.querySelector('#welcome');
var startButtonEl = document.querySelector('#start-quiz');
var questionBoxEl = document.querySelector('#question-box');
var endQuizEl = document.querySelector('#end-quiz');
var highScoresEl = document.querySelector('#high-scores');
var answerFeedbackEl = document.querySelector('#feedback');
var timerEl = document.querySelector('#timer');
var scoreButtonEl = document.querySelector('#score-button');


//the quizProgress lets us know which question we're on in the quizBank object
var quizProgress = 0;

//make the timer variable global so that multiple functions can access it
var timer = 100;

//create an empty object to hold the high scores
var highScores = [];

//variable to clear the timer from the endQuiz function if the user gets there before the timer runs out
var endQuizIndicator = false;



//capture each element of the question li to later populate with text from the quizBank
var questionText = document.querySelector('#question-text');
var choice1 = document.querySelector('#choice1');
var choice2 = document.querySelector('#choice2');
var choice3 = document.querySelector('#choice3');
var choice4 = document.querySelector('#choice4');



var startQuiz = function () {
    //hide welcome div, show question div during the quiz; all divs start as display:none, change as needed
    welcomeEl.style.display = 'none';
    questionBoxEl.style.display = 'block';
    
    //populate question content from array with loadQuestion function
    loadQuestion(quizProgress);
    quizProgress++;

    //capture all clicks ont the question-box div, if a list-item is clicked check the answer
    questionBoxEl.addEventListener('click', checkAnswer);

};



var quizTimer = function() {

    var countdown = setInterval(function() {
        if (timer > 0) {
            timer --;
            timerEl.textContent = 'Time: ' + timer;
        } 
        else {
            timerEl.textContent = 'Time: 0';
            clearInterval(countdown);
            endQuiz();
        }

        if (endQuizIndicator) {
            clearInterval(countdown);
        }

        
    }, 1000);
};



var loadQuestion = function(quizProgress) {
    //using global value of quizProgress as the index, get question text and fill into corresponding elements
    questionText.textContent = quizBank[quizProgress].question;
    choice1.textContent = quizBank[quizProgress].choices[0].text;
    choice2.textContent = quizBank[quizProgress].choices[1].text;
    choice3.textContent = quizBank[quizProgress].choices[2].text;
    choice4.textContent = quizBank[quizProgress].choices[3].text;

    //create attribute to store our 1s and 0s to check the answer
    choice1.setAttribute('data-correct', quizBank[quizProgress].choices[0].correct);
    choice2.setAttribute('data-correct', quizBank[quizProgress].choices[1].correct);
    choice3.setAttribute('data-correct', quizBank[quizProgress].choices[2].correct);
    choice4.setAttribute('data-correct', quizBank[quizProgress].choices[3].correct);
};




var checkAnswer = function() {
    //if a list-item / answer choice is clicked, check whether its data-correct attribute is correct(1) or incorrect(0)
    //if incorrect subtract 10 from the timer
    var targetEl = event.target;
    var verifyCorrect = targetEl.getAttribute('data-correct');
    if (parseInt(verifyCorrect) === 1) {
        answerFeedbackEl.textContent = 'Correct!';
    }
    else {
        answerFeedbackEl.textContent = 'Incorrect';
        timer = timer - 10;
    }

    var clearFeedback = function() {answerFeedbackEl.textContent = '';};
    setTimeout(clearFeedback, 2000);

    if (quizProgress < quizBank.length) {
        startQuiz();
    }
    else {
        endQuiz();
    }
};

var endQuiz = function() {
    questionBoxEl.style.display = 'none';
    endQuizEl.style.display = 'block';

    endQuizIndicator = true;
    
    var highScore = timer;
    document.querySelector('#score').textContent = highScore;

    //scoreButtonEl.addEventListener('submit', saveScore(highScore));
    
};

// var saveScore = function(highScore) {
//     alert('Button works');
//     var userInitials = document.querySelector('input').value;
//     console.log(userInitials);
//     var scoreAndInitials = {name: userInitials, score: highScore};
//     highScores.push(scoreAndInitials);
//     localStorage.setItem('scores', JSON.stringify(highScores));
// };



startButtonEl.addEventListener('click', startQuiz);
startButtonEl.addEventListener('click', quizTimer); 