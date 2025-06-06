const quizListDiv = document.getElementById('quizList');
const quizContainer = document.getElementById('quizContainer');
const submitBtn = document.getElementById('submitAnswersBtn');
const scoreBox = document.getElementById('scoreBox');

const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');

// Show all quizzes as clickable cards
quizzes.forEach((quiz, index) => {
  const card = document.createElement('div');
  card.className = 'quiz-card';
  card.textContent = quiz.title;
  card.addEventListener('click', () => loadQuiz(index));
  quizListDiv.appendChild(card);
});

function loadQuiz(index) {
  quizContainer.innerHTML = '';
  scoreBox.textContent = '';
  submitBtn.style.display = 'none';

  const selectedQuiz = quizzes[index];

  selectedQuiz.questions.forEach((q, qIndex) => {
    const box = document.createElement('div');
    box.className = 'question-box';

    let html = `<p><strong>Q${qIndex + 1}:</strong> ${q.question}</p>`;
    ['A', 'B', 'C', 'D'].forEach(opt => {
      html += `
        <label>
          <input type="radio" name="question${qIndex}" value="${opt}">
          ${opt}: ${q.options[opt]}
        </label><br>`;
    });

    box.innerHTML = html;
    quizContainer.appendChild(box);
  });

  submitBtn.style.display = 'block';

  submitBtn.onclick = () => {
    let score = 0;
    selectedQuiz.questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="question${i}"]:checked`);
      if (selected && selected.value === q.correct) {
        score++;
      }
    });
    scoreBox.textContent = `Your Score: ${score} / ${selectedQuiz.questions.length}`;
  };
}
