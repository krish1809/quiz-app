let questions = [];

document.getElementById('addQuestionBtn').addEventListener('click', () => {
  const container = document.getElementById('questionsContainer');
  const qIndex = container.querySelectorAll('.question-box').length; // Get current count dynamically

  const box = document.createElement('div');
  box.className = 'question-box';
  box.innerHTML = `
    <label>Question ${qIndex + 1}</label>
    <input type="text" placeholder="Enter question" class="question" data-index="${qIndex}">
    <input type="text" placeholder="Option A" class="option" data-index="${qIndex}" data-opt="A">
    <input type="text" placeholder="Option B" class="option" data-index="${qIndex}" data-opt="B">
    <input type="text" placeholder="Option C" class="option" data-index="${qIndex}" data-opt="C">
    <input type="text" placeholder="Option D" class="option" data-index="${qIndex}" data-opt="D">
    <select class="correct" data-index="${qIndex}">
      <option value="">Select correct option</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
    </select>
  `;
  container.appendChild(box);
});

document.getElementById('submitQuizBtn').addEventListener('click', () => {
  const quizTitle = document.getElementById('quizTitle').value.trim();
  if (!quizTitle) return alert("Quiz title is required!");

  const boxes = document.querySelectorAll('.question-box');
  const quizQuestions = [];

  boxes.forEach((box, index) => {
    const questionText = box.querySelector('.question').value.trim();
    const options = {
      A: box.querySelector('[data-opt="A"]').value.trim(),
      B: box.querySelector('[data-opt="B"]').value.trim(),
      C: box.querySelector('[data-opt="C"]').value.trim(),
      D: box.querySelector('[data-opt="D"]').value.trim()
    };
    const correct = box.querySelector('.correct').value;

    if (!questionText || !options.A || !options.B || !options.C || !options.D || !correct) {
      return alert(`Fill all fields for question ${index + 1}`);
    }

    quizQuestions.push({ question: questionText, options, correct });
  });

  if (quizQuestions.length === 0) return alert("Add at least one question!");

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('quizzes') || '[]');
  existing.push({ title: quizTitle, questions: quizQuestions });
  localStorage.setItem('quizzes', JSON.stringify(existing));

  alert("Quiz saved successfully!");
  window.location.href = "index.html";
});
