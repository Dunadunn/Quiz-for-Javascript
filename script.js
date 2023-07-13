document.addEventListener('DOMContentLoaded', (event) => {
    var questions = [
        {
            question: "What containers are used for storing information in JavaScript?",
            choices: ["Java Holder", "Script Manager", "JavaScript variable", "Hold My Java"],
            answer: "JavaScript variable"
        },

        {
            question: "Which of the following is not a JavaScript data type?",
            choices: ["String", "Number", "Boolean", "Character"],
            answer: "Character"
        },

        {
            question: "Which of the following is not a valid JavaScript variable name?",
            choices: ["2names", "_names", "FirstAndLastNames", "None of the above"],
            answer: "2names"
        },

        {
            question: "What will the following code return: Boolean(10 > 9)?",
            choices: ["True", "False", "NaN", "undefined"],
            answer: "True"
        }
        // Follow format for more questions.
    ];
    
    var currentQuestionIndex = 0;
    var time = questions.length * 25;  // Each question set to value in seconds
    var timerId;
    
    document.getElementById('start').addEventListener('click', startQuiz);
    
    function startQuiz() {
        // should remove start button for quiz
        document.getElementById('start').style.display = 'none';
    
        // Starts timer wehn quiz starts
        timerId = setInterval(clockTick, 1000);
    
        // Shows 1st question
        showQuestion();
    }
    
    function showQuestion() {
        var currentQuestion = questions[currentQuestionIndex];
    
        // Update text
        document.getElementById('question').innerText = currentQuestion.question;
    
        // Clear previous choices
        document.getElementById('choices').innerHTML = '';
    
        // Loop over choices
        currentQuestion.choices.forEach(function(choice, i) {
            // new button for each choice
            var choiceNode = document.createElement('button');
            choiceNode.setAttribute('class', 'choice');
            choiceNode.setAttribute('value', choice);
    
            // show choice text
            //choiceNode.innerText = i + 1 + '. ' + choice; Commented out due to numbering the choices
            choiceNode.innerText = choice;

    
            //click event listener each choice
            choiceNode.onclick = questionClick;
    
            // show on document
            document.getElementById('choices').appendChild(choiceNode);
        });
    }
    
    function questionClick() {
        // display result
        var resultEl = document.createElement('p');
        resultEl.setAttribute('id', 'result');
        // check for wrong answer
        if (this.value !== questions[currentQuestionIndex].answer) {
            // take seconds away when wrong
            time -= 15;
    
            if (time < 0) {
                time = 0;
            }

            // Show Incorrect text
            resultEl.textContent = "Incorrect!";
        } else {
            // Show Correct text
            resultEl.textContent = "Correct!";
        }
        
        // Attach result element to body
        document.body.appendChild(resultEl);
        
        // show new time on page
        document.getElementById('timer').textContent = time;
        
        // next question
        currentQuestionIndex++;
    
        // check if no else end questions
        if (currentQuestionIndex === questions.length) {
            endQuiz();
        } else {
            showQuestion();
        }
}

    
    function endQuiz() {
        // stop timer
        clearInterval(timerId);
    
        // show end
        var endScreenEl = document.getElementById('score-container');
        endScreenEl.removeAttribute('style');
    
        // show final score
        var finalScoreEl = document.getElementById('score');
        finalScoreEl.textContent = time;
    }
    
    function clockTick() {
        // update ~
        time--;
        document.getElementById('timer').textContent = time;
    
        // time out?
        if (time <= 0) {
            endQuiz();
        }
    }
    
    document.getElementById('save-score-form').addEventListener('submit', saveScore);
    
    var saveScoreButton = document.querySelector('#save-score-form button');
    var saveScoreForm = document.getElementById('save-score-form');

    saveScoreForm.addEventListener('submit', saveScore);

    function saveScore(e) {
        e.preventDefault();
    
        var initials = document.getElementById('initials').value.trim();
    
        // no empty value
        if(initials !== '') {
            //disable button after use to prevent spam
            saveScoreButton.disabled = true;
            // pull saved scores from localstorage, set to empty array if not
            var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    
            var newScore = {
                score: time,
                initials: initials
            };
    
            // save localstorage
            highscores.push(newScore);
            window.localStorage.setItem('highscores', JSON.stringify(highscores));
    
            showHighScores();
        }
    }
    
    function showHighScores() {
        // pull from localstorage
        var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    
        // hide old high scores
        var olEl = document.getElementById('highscores');
        olEl.innerHTML = '';
    
        // put highscores array in descending order
        highscores.sort(function(a, b) { return b.score - a.score });
    
        highscores.forEach(function(score) {
            // list tag
            var liTag = document.createElement('li');
            liTag.textContent = score.initials + ' - ' + score.score;
    
            // display HS list
            olEl.appendChild(liTag);
        });
    }
    
    // Show HS when page loads
    showHighScores();
});
    