let currentPage = 0;
const answers = [];
    
function renderQuestions() {
  const questionArea = document.getElementById("question-area");
  const set = questionSets[currentPage];

  questionArea.innerHTML = set.map((item, i) => {
  const saved = answers[currentPage * 4 + i];

    return `
      <div class="question-box">
        <p>설문 ${currentPage * 4 + i + 1}. ${item.q}</strong></p>
        <div class="options">
          <button type="button" onclick="selectOption(${i}, 0, this)" 
            class="${saved === 0 ? 'selected' : ''}">${item.a[0]}</button>
          <button type="button" onclick="selectOption(${i}, 1, this)" 
            class="${saved === 1 ? 'selected' : ''}">${item.a[1]}</button>
        </div>
      </div>
    `;
  }).join("");

  const nextBtn = document.getElementById("next-btn");
  if (currentPage === questionSets.length - 1) {
    nextBtn.textContent = "제출하기";
  } else {
    nextBtn.textContent = "다음페이지로";
  }

  updateProgress();
}

function selectOption(questionIndex, answerIndex, element) {
  answers[currentPage * 4 + questionIndex] = answerIndex;
  const buttons = element.parentNode.querySelectorAll("button");
  buttons.forEach(btn => btn.classList.remove("selected"));
  element.classList.add("selected");
  updateProgress();
}

function prevPage() {
if (currentPage > 0) {
  currentPage--;
  renderQuestions();
} else {
  alert("첫 페이지입니다!");
}
}

function nextPage() {
  const pageAnswers = answers.slice(currentPage * 4, currentPage * 4 + 4);
  if (pageAnswers.length < 4 || pageAnswers.includes(undefined)) {
    alert("모든 문항에 응답해 주세요.");
    return;
  }
  currentPage++;
  if (currentPage >= questionSets.length) {
    const mbti = calculateMBTI();
    const traits = calculateTraits();
    const traitsParam = encodeURIComponent(JSON.stringify(traits));
    window.location.href = `result.html?mbti=${mbti}&traits=${traitsParam}`;
    return;
  } 
  renderQuestions();
}

function calculateMBTI() {
  let EI = 0, SN = 0, TF = 0, JP = 0;

  for (let i = 0; i < answers.length; i++) {
    const typeIndex = Math.floor(i / 10);
    const answer = answers[i];

  if (typeIndex === 0) EI += answer === 0 ? 1 : -1;
  if (typeIndex === 1) SN += answer === 0 ? 1 : -1;
  if (typeIndex === 2) TF += answer === 0 ? 1 : -1;
  if (typeIndex === 3) JP += answer === 0 ? 1 : -1;
}

return `${EI >= 0 ? "E" : "I"}${SN >= 0 ? "S" : "N"}${TF >= 0 ? "T" : "F"}${JP >= 0 ? "J" : "P"}`;
}

window.onload = renderQuestions;
function updateProgress() {
  const totalQuestions = questionSets.length * 4;
  const answered = answers.filter(a => a !== undefined).length;
  const percent = (answered / totalQuestions) * 100;

  const bar = document.getElementById("progress-bar");
  bar.style.width = `${percent}%`;
}

function calculateTraits() {
  const results = [];

  for (let i = 0; i < 4; i++) {
    let score = 0;
    for (let j = 0; j < 10; j++) {
      const index = i * 10 + j;
      if (answers[index] === 1) score++;
    }
    results.push(score * 10);
  }

  return results;
}