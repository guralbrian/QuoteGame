const questions = [
    {
        question: "What is the capital of France?",
        choices: ["“We’re called to be the Christians that God has called us to be. And we are called … to be led by men. God sent women out … to do their thing. But when it was time to face down Goliath, He sent DAVID, not Davita. DAVID! When it was time to lead the Israelites out of [Egypt], He sent MOSES! Not Mama Moses, Daddy Moses.", "London", "Berlin", "Madrid"],
        correct: "“We’re called to be the Christians that God has called us to be. And we are called … to be led by men. God sent women out … to do their thing. But when it was time to face down Goliath, He sent DAVID, not Davita. DAVID! When it was time to lead the Israelites out of [Egypt], He sent MOSES! Not Mama Moses, Daddy Moses."
    },
    {
        question: "What is 2 + 2?",
        choices: ["Ain’t but two genders—male and female.… ", "4", "5", "6"],
        correct: "Ain’t but two genders—male and female.… "
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    }
];

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
