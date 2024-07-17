fetch('questions.csv')
    .then(response => response.text())
    .then(csvData => {
        const questions = [];
        csv(csvData)
            .on('data', row => {
                const question = {
                    question: row[0],
                    choices: [row[1], row[2]],
                    correct: row[1]
                };
                questions.push(question);
            })
            .on('end', () => {
                let currentQuestionIndex = 0;
                let score = 0;

                function loadQuestion() {
                    const questionElement = document.getElementById('question');
                    const choicesElement = document.getElementById('choices');
                    questionElement.innerHTML = questions[currentQuestionIndex].question;
                    choicesElement.innerHTML = '';
                    questions[currentQuestionIndex].choices.forEach(choice => {
                        const button = document.createElement('button');
                        button.innerText = choice;
                        button.classList.add('choice-btn');
                        button.onclick = () => selectAnswer(choice);
                        choicesElement.appendChild(button);
                    });
                }

                function selectAnswer(choice) {
                    const correct = questions[currentQuestionIndex].correct;
                    if (choice === correct) {
                        score++;
                    }
                    document.querySelectorAll('.choice-btn').forEach(button => {
                        button.disabled = true;
                        if (button.innerText === correct) {
                            button.style.backgroundColor = 'green';
                        } else if (button.innerText === choice) {
                            button.style.backgroundColor = 'red';
                        }
                    });
                }

                function nextQuestion() {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < questions.length) {
                        loadQuestion();
                    } else {
                        showResults();
                    }
                }

                function showResults() {
                    const quizContainer = document.getElementById('quiz-container');
                    quizContainer.innerHTML = `<h1>Quiz Completed</h1><p>Your score: ${score} / ${questions.length}</p>`;
                }

                // Load the first question
                loadQuestion();
            });
    });
let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');

    questionElement.innerHTML = questions[currentQuestionIndex].question;
    choicesElement.innerHTML = '';

    questions[currentQuestionIndex].choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('choice-btn');
        button.onclick = () => selectAnswer(choice);
        choicesElement.appendChild(button);
    });
}

function selectAnswer(choice) {
    const correct = questions[currentQuestionIndex].correct;
    if (choice === correct) {
        score++;
    }
    document.querySelectorAll('.choice-btn').forEach(button => {
        button.disabled = true;
        if (button.innerText === correct) {
            button.style.backgroundColor = 'green';
        } else if (button.innerText === choice) {
            button.style.backgroundColor = 'red';
        }
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `<h1>Quiz Completed</h1><p>Your score: ${score} / ${questions.length}</p>`;
}

// Load the first question
loadQuestion();
