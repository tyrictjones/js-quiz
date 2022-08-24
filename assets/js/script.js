// ------------------------ global variables ------------------------------

// object with all the quiz questions
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
        question: 'Which of the following is not a falsy value?',
        choices: [
            {text: '0', correct: 0},
            {text: 'null', correct: 0},
            {text: 'NaN', correct: 0},
            {text: '-5', correct: 1},
        ]
    },
    {
        id: 3,
        question: 'Which expression creates a new array?',
        choices: [
            {text: 'var Colors = [blue, green, yellow, red];', correct: 1},
            {text: 'Colors = red & yellow', correct: 0},
            {text: 'set Colors: blue; green; yellow; red;', correct: 0},
            {text: 'x = 1', correct: 0},
        ]
    },{
        id: 4,
        question: 'What method can you use to join two arrays?',
        choices: [
            {text: 'connect()', correct: 0},
            {text: 'concat()', correct: 1},
            {text: 'addArray()', correct: 0},
            {text: 'plus()', correct: 0},
        ]
    },{
        id: 5,
        question: 'What do you call a function that is a property of an object?',
        choices: [
            {text: 'action', correct: 0},
            {text: 'method', correct: 1},
            {text: 'utility', correct: 0},
            {text: 'document', correct: 0},
        ]
    },{
        id: 6,
        question: 'Which expression creates a random number between 1 and 10?',
        choices: [
            {text: 'randomInt(0-10)', correct: 0},
            {text: 'Math.random() * 11', correct: 0},
            {text: 'Math.floor(Math.random() * 11)', correct: 1},
            {text: 'Math.random(0, 10)', correct: 0},
        ]
    },{
        id: 7,
        question: 'How do you create a dialog box that accepts text input?',
        choices: [
            {text: 'window.alert', correct: 0},
            {text: 'window.confirm', correct: 0},
            {text: 'console.log', correct: 0},
            {text: 'window.prompt', correct: 1},
        ]
    },{
        id: 8,
        question: 'What is the index of the first item in an array?',
        choices: [
            {text: '1', correct: 0},
            {text: 'init', correct: 0},
            {text: 'null', correct: 0},
            {text: '0', correct: 1},
        ]
    },{
        id: 9,
        question: 'What is the DOM?',
        choices: [
            {text: 'Document Object Model', correct: 1},
            {text: 'Data Oriented Model', correct: 0},
            {text: 'Delete Other Methods', correct: 0},
            {text: 'a fancy variable', correct: 0},
        ]
    }
];


//capture each of the divs in the main section so that we can hide/display them as needed
//capture all other elements that we will need in multiple functions
var startButtonEl = document.querySelector('#start-quiz');
var welcomeEl = document.querySelector('#welcome');
var questionBoxEl = document.querySelector('#question-box');
var endQuizEl = document.querySelector('#end-quiz');
var highScoresEl = document.querySelector('#high-scores');
var scoreButtonEl = document.querySelector('#score-button');
var scoresLinkEl = document.querySelector('#scores-link');
var clearButtonEl = document.querySelector('#clear');


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


// ----------------------------- functions --------------------------------------

// start pulling questions from the quiz bank and hide the welcome screen
var startQuiz = function () {
    //hide welcome div, show question div during the quiz; all divs start as display:none, change as needed
    welcomeEl.style.display = 'none';
    questionBoxEl.style.display = 'block';
    highScoresEl.style.display = 'none';
    
    //populate question content from array with loadQuestion function
    loadQuestion(quizProgress);
    //increment progress counter
    quizProgress++;

    //capture all clicks on the question-box div, if a list-item is clicked check the answer
    questionBoxEl.addEventListener('click', checkAnswer);

};



// start timer at 100 and count down to 0, stop countdown if user answers all questions
var quizTimer = function() {
    // select the div in the header that houses the timer countdown text
    var timerEl = document.querySelector('#timer');

    var countdown = setInterval(function() {
        // if the timer variable is > 0, subtract 1 every second and display that value
        if (timer > 0) {
            timer --;
            timerEl.textContent = 'Time: ' + timer;
        } 
        // if the timer is zero stop the timer and end the quiz
        else {
            timerEl.textContent = 'Time: 0';
            clearInterval(countdown);
            endQuiz();
        }

        // if the user has reached the endQuiz function by answering all the questions before the timer reaches zero, stop the timer
        if (endQuizIndicator) {
            clearInterval(countdown);
        }

        
    }, 1000);
};



// use the quizProgress variable to get the content and attribute (to determine correct/incorrect) of the next question
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



// check whether clicked list-item is the correct answer and display feedback to user
var checkAnswer = function() {
    var answerFeedbackEl = document.querySelector('#feedback');
    
    // if a list-item / answer choice is clicked, check whether its data-correct attribute is correct(1) or incorrect(0)
    // if incorrect subtract 10 from the timer
    var targetEl = event.target;
    var verifyCorrect = targetEl.getAttribute('data-correct');
    if (parseInt(verifyCorrect) === 1) {
        answerFeedbackEl.textContent = 'Correct!';
    }
    else {
        answerFeedbackEl.textContent = 'Incorrect!';
        timer = timer - 10;
    }

    // red "Correct" or "Incorrect" displays from previous If statement, clear this after 2 seconds
    var clearFeedback = function() {answerFeedbackEl.textContent = '';};
    setTimeout(clearFeedback, 2000);

    // if there are more questions in the quiz bank object, go back to startQuiz to load another question
    if (quizProgress < quizBank.length) {
        startQuiz();
    }
    else {
        endQuiz();
    }
};



// tell the user that the quiz is over and what their score is; allow them to save their score if it is > 0
var endQuiz = function() {
    // hide the div we use for displaying questions, show the div with post-quiz content
    questionBoxEl.style.display = 'none';
    endQuizEl.style.display = 'block';

    // also want to stop the timer function when this changes from false to true
    endQuizIndicator = true;

    if (timer === 0) {
        document.querySelector('#score-form').style.display = 'none';
        document.querySelector('#display-score').textContent = 'You did not get a high score.'
    }
    else {
        var highScore = timer;
        document.querySelector('#display-score').textContent = 'Your score is ' + highScore;
    }

};



// Save the players initials (via input) and the value of the timer as their score
var saveScore = function() {
    event.preventDefault();
    highScoresEl.style.display = 'block';
    endQuizEl.style.display = 'none';
    

    var userInitials = document.querySelector('input').value;

    highScores.push({user: userInitials, score: timer});

    // save high scores to local storage so that they persist
    localStorage.setItem('scores', JSON.stringify(highScores));

    loadScores();
};



// use the high scores object to create a list
var createScoreList = function() {
    var scoreList = document.querySelector('#score-list');

    for (i = 0; i < highScores.length; i++) {
        var scoreListItem = document.createElement('li');
        scoreListItem.textContent = highScores[i].user + '  -  ' + highScores[i].score;
        scoreList.appendChild(scoreListItem);
    }
};



// load the stored scores in localStorage 
var loadScores = function() {
    var savedScores = localStorage.getItem('scores');

    if (savedScores === null) {
        return false;
    }

    savedScores = JSON.parse(savedScores);
    highScores = savedScores;

    createScoreList();
};


// get to the high scores list if you're not on the endQuiz function
var showHighScores = function() {
    highScoresEl.style.display = 'block';
    welcomeEl.style.display = 'none';
    
};



// clear all scores from localStorage
var clearScores = function() {
    localStorage.clear();
}





startButtonEl.addEventListener('click', startQuiz);
startButtonEl.addEventListener('click', quizTimer);
scoreButtonEl.addEventListener('click', saveScore); 
scoresLinkEl.addEventListener('click', showHighScores);
clearButtonEl.addEventListener('click', clearScores);

// load stored scores when page loads
loadScores();