// Elementos HTML
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const showAnswerButton = document.getElementById("show-answer-btn");
const answerElement = document.getElementById("answer");
const nextButton = document.getElementById("next-btn");
const questionCounter = document.getElementById("question-counter");

let qaList = []; // Array para almacenar las preguntas y respuestas
let currentQuestionIndex = 0;
let totalQuestions = 0;
let answeredQuestions = 0;

// Función para mostrar la próxima pregunta
function showNextQuestion() {
    if (currentQuestionIndex < qaList.length) {
        const currentQuestion = qaList[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        // Utiliza innerHTML en lugar de textContent para permitir HTML
        answerElement.innerHTML = currentQuestion.answer;
        currentQuestionIndex++;
        answeredQuestions++; // Incrementar el contador de preguntas respondidas
        updateQuestionCounter();
    } else {
        questionElement.textContent = "¡Todas las preguntas han sido respondidas!";
        showAnswerButton.style.display = "none";
        nextButton.style.display = "none";
    }
}

function updateQuestionCounter() {
    questionCounter.textContent = `${answeredQuestions}/${totalQuestions}`;
}

// Función para cargar las preguntas y respuestas desde un archivo de texto
async function loadQuestionsFromFile() {
    try {
        const response = await fetch("preguntas/redes.txt");
        if (response.ok) {
            const text = await response.text();
            const lines = text.split('\n');
            for (const line of lines) {
                const [question, answer] = line.split('|');
                const formattedAnswer = answer.replace(/\\n/g, '<br>');
                qaList.push({ question, answer: formattedAnswer });
            }
            totalQuestions = qaList.length;
            answeredQuestions = 0;
            updateQuestionCounter();
            for (let i = qaList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [qaList[i], qaList[j]] = [qaList[j], qaList[i]];
            }

            showNextQuestion();
        } else {
            console.error("No se pudo cargar el archivo de preguntas.");
        }
    } catch (error) {
        console.error("Error en la carga del archivo de preguntas:", error);
    }
}

// Manejar el evento de hacer clic en "Mostrar Respuesta"
showAnswerButton.addEventListener("click", function () {
    answerElement.style.display = "block";
});

// Manejar el evento de hacer clic en "Siguiente"
nextButton.addEventListener("click", function () {
    answerElement.style.display = "none";
    showNextQuestion();
});

// Inicializar la carga de preguntas desde el archivo de texto
loadQuestionsFromFile();
