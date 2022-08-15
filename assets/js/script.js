var quizBank = [
    {
        id: 0,
        question: 'Which keyword will not allow you to create a new variable?',
        choices: [
            {text: 'var', correct: 0},
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
    }
];

//console.log(quizBank[1].question);
//console.log(quizBank[1].choices[0].text);

var startButtonEl = document.querySelector('#start-quiz');
var questionBoxEl = document.querySelector('#question-box');
var answerFeedbackEl = document.querySelector('#feedback');

var questionText = document.querySelector('#question-text');
var choice1 = document.querySelector('#choice1');
var choice2 = document.querySelector('#choice2');
var choice3 = document.querySelector('#choice3');
var choice4 = document.querySelector('#choice4');



var startQuiz = function () {
    //populate question content from array; eventually loadQuestion() function
    questionText.textContent = quizBank[0].question;
    choice1.textContent = quizBank[0].choices[0].text;
    choice2.textContent = quizBank[0].choices[1].text;
    choice3.textContent = quizBank[0].choices[2].text;
    choice4.textContent = quizBank[0].choices[3].text;

    choice1.setAttribute('data-correct', quizBank[0].choices[0].correct);
    choice2.setAttribute('data-correct', quizBank[0].choices[1].correct);
    choice3.setAttribute('data-correct', quizBank[0].choices[2].correct);
    choice4.setAttribute('data-correct', quizBank[0].choices[3].correct);

    questionBoxEl.addEventListener('click', checkAnswer);
};




var checkAnswer = function() {
    var targetEl = event.target;
    console.log(targetEl);
    var verifyCorrect = targetEl.getAttribute('data-correct');
    console.log(verifyCorrect);
    if (parseInt(verifyCorrect) === 1) {
        answerFeedbackEl.textContent = 'Correct!';
    }
    else {
        answerFeedbackEl.textContent = 'Incorrect';
    }
};



startButtonEl.addEventListener('click', startQuiz);