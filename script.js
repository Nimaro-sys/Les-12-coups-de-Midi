let questions = [];
let availableQuestions = []; // Liste des questions restantes
let currentQuestion = null;
let score = 0;

// Charger les questions depuis le JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        availableQuestions = [...questions]; // Copie initiale des questions
        displayQuestion();
    })
    .catch(error => console.error('Erreur lors du chargement des questions:', error));

// Afficher une question aléatoire
function displayQuestion() {
    const questionContainer = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers');
    const resultContainer = document.getElementById('result');
    const nextButton = document.getElementById('next-btn');

    // Réinitialiser
    answersContainer.innerHTML = '';
    resultContainer.innerHTML = '';

    // Vérifier s'il reste des questions
    if (availableQuestions.length === 0) {
        questionContainer.innerHTML = 'Fin du jeu !';
        answersContainer.innerHTML = `<p>Votre score : ${score}/${questions.length}</p>`;
        nextButton.style.display = 'none';
        return;
    }

    // Choisir une question aléatoire
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];
    
    // Afficher la question
    questionContainer.innerHTML = currentQuestion.question;

    // Mélanger les réponses
    const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5);

    answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.innerHTML = answer;
        button.onclick = () => checkAnswer(answer, currentQuestion.correct_answer);
        answersContainer.appendChild(button);
    });
}

// Vérifier la réponse
function checkAnswer(selectedAnswer, correctAnswer) {
    const resultContainer = document.getElementById('result');
    const buttons = document.querySelectorAll('.answer-btn');

    buttons.forEach(button => {
        button.disabled = true;
        if (button.innerHTML === correctAnswer) {
            button.classList.add('correct');
        } else if (button.innerHTML === selectedAnswer) {
            button.classList.add('wrong');
        }
    });

    if (selectedAnswer === correctAnswer) {
        resultContainer.innerHTML = 'Bonne réponse ! Zizi approuve !';
        score++;
    } else {
        resultContainer.innerHTML = `Mauvaise réponse ! La bonne était : ${correctAnswer}`;
    }
}

// Passer à la question suivante
function nextQuestion() {
    // Retirer la question actuelle des questions disponibles
    availableQuestions = availableQuestions.filter(q => q !== currentQuestion);
    displayQuestion();
}