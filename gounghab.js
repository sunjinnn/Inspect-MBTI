let currentTarget = null;
let meSelected = null;
let youSelected = null;

const mbtiScoreMap = {
  ISTJ: { ISTJ: 8, ISFJ: 7, INFJ: 5, INTJ: 6, ISTP: 7, ISFP: 4, INFP: 3, INTP: 5, ESTP: 6, ESFP: 2, ENFP: 1, ENTP: 4, ESTJ: 9, ESFJ: 7, ENFJ: 4, ENTJ: 6 },
  ISFJ: { ISTJ: 7, ISFJ: 8, INFJ: 6, INTJ: 5, ISTP: 6, ISFP: 7, INFP: 5, INTP: 4, ESTP: 5, ESFP: 6, ENFP: 3, ENTP: 2, ESTJ: 8, ESFJ: 9, ENFJ: 6, ENTJ: 4 },
  INFJ: { ISTJ: 5, ISFJ: 6, INFJ: 8, INTJ: 7, ISTP: 6, ISFP: 7, INFP: 9, INTP: 7, ESTP: 3, ESFP: 2, ENFP: 8, ENTP: 6, ESTJ: 4, ESFJ: 5, ENFJ: 8, ENTJ: 7 },
  INTJ: { ISTJ: 6, ISFJ: 5, INFJ: 7, INTJ: 8, ISTP: 6, ISFP: 4, INFP: 6, INTP: 8, ESTP: 3, ESFP: 2, ENFP: 5, ENTP: 7, ESTJ: 7, ESFJ: 5, ENFJ: 6, ENTJ: 9 },
  ISTP: { ISTJ: 7, ISFJ: 6, INFJ: 6, INTJ: 6, ISTP: 8, ISFP: 7, INFP: 6, INTP: 7, ESTP: 6, ESFP: 5, ENFP: 5, ENTP: 6, ESTJ: 5, ESFJ: 4, ENFJ: 4, ENTJ: 6 },
  ISFP: { ISTJ: 4, ISFJ: 7, INFJ: 7, INTJ: 4, ISTP: 7, ISFP: 8, INFP: 9, INTP: 6, ESTP: 5, ESFP: 6, ENFP: 6, ENTP: 5, ESTJ: 3, ESFJ: 6, ENFJ: 5, ENTJ: 3 },
  INFP: { ISTJ: 3, ISFJ: 5, INFJ: 9, INTJ: 6, ISTP: 6, ISFP: 9, INFP: 8, INTP: 7, ESTP: 4, ESFP: 5, ENFP: 9, ENTP: 6, ESTJ: 2, ESFJ: 4, ENFJ: 8, ENTJ: 5 },
  INTP: { ISTJ: 5, ISFJ: 4, INFJ: 7, INTJ: 8, ISTP: 7, ISFP: 6, INFP: 7, INTP: 8, ESTP: 5, ESFP: 4, ENFP: 6, ENTP: 9, ESTJ: 4, ESFJ: 3, ENFJ: 5, ENTJ: 8 },
  ESTP: { ISTJ: 6, ISFJ: 5, INFJ: 3, INTJ: 3, ISTP: 6, ISFP: 5, INFP: 4, INTP: 5, ESTP: 8, ESFP: 9, ENFP: 7, ENTP: 7, ESTJ: 7, ESFJ: 6, ENFJ: 6, ENTJ: 6 },
  ESFP: { ISTJ: 2, ISFJ: 6, INFJ: 2, INTJ: 2, ISTP: 5, ISFP: 6, INFP: 5, INTP: 4, ESTP: 9, ESFP: 8, ENFP: 8, ENTP: 6, ESTJ: 6, ESFJ: 7, ENFJ: 7, ENTJ: 5 },
  ENFP: { ISTJ: 1, ISFJ: 3, INFJ: 8, INTJ: 5, ISTP: 5, ISFP: 6, INFP: 9, INTP: 6, ESTP: 7, ESFP: 8, ENFP: 8, ENTP: 8, ESTJ: 4, ESFJ: 5, ENFJ: 9, ENTJ: 6 },
  ENTP: { ISTJ: 4, ISFJ: 2, INFJ: 6, INTJ: 7, ISTP: 6, ISFP: 5, INFP: 6, INTP: 9, ESTP: 7, ESFP: 6, ENFP: 8, ENTP: 8, ESTJ: 6, ESFJ: 4, ENFJ: 7, ENTJ: 9 },
  ESTJ: { ISTJ: 9, ISFJ: 8, INFJ: 4, INTJ: 7, ISTP: 5, ISFP: 3, INFP: 2, INTP: 4, ESTP: 7, ESFP: 6, ENFP: 4, ENTP: 6, ESTJ: 8, ESFJ: 9, ENFJ: 5, ENTJ: 7 },
  ESFJ: { ISTJ: 7, ISFJ: 9, INFJ: 5, INTJ: 5, ISTP: 4, ISFP: 6, INFP: 4, INTP: 3, ESTP: 6, ESFP: 7, ENFP: 5, ENTP: 4, ESTJ: 9, ESFJ: 8, ENFJ: 6, ENTJ: 6 },
  ENFJ: { ISTJ: 4, ISFJ: 6, INFJ: 8, INTJ: 6, ISTP: 4, ISFP: 5, INFP: 8, INTP: 5, ESTP: 6, ESFP: 7, ENFP: 9, ENTP: 7, ESTJ: 5, ESFJ: 6, ENFJ: 8, ENTJ: 8 },
  ENTJ: { ISTJ: 6, ISFJ: 4, INFJ: 7, INTJ: 9, ISTP: 6, ISFP: 3, INFP: 5, INTP: 8, ESTP: 6, ESFP: 5, ENFP: 6, ENTP: 9, ESTJ: 7, ESFJ: 6, ENFJ: 8, ENTJ: 8 }
};

function startSelection(target) {
  if (currentTarget && currentTarget !== target) {
    alert("다른 창에서 선택 중입니다. 먼저 완료하거나 닫아주세요.");
    return;
  }

  currentTarget = target;

  const button = document.getElementById(`${target}-button`);
  button.textContent = "선택 창 닫기";
  button.onclick = () => cancelSelection(target);

  enableMbtigounghabs();
}

function cancelSelection(target) {
  currentTarget = null;

  const button = document.getElementById(`${target}-button`);
  button.textContent = "선택하기";
  button.onclick = () => startSelection(target);

  disableMbtigounghabs();
}

function selectMbti(type) {
  if (!currentTarget) return;

  const target = currentTarget; 

  const resultBox = document.getElementById(`${target}-result`);
  resultBox.innerHTML = `<img src="mbtiemoji/${type}.png" alt="${type}"><br><span>${type}</span>`;

  if (target === 'me') meSelected = type;
  if (target === 'you') youSelected = type;

  const button = document.getElementById(`${target}-button`);
  button.textContent = "선택하기";
  button.onclick = () => startSelection(target); 

  disableMbtigounghabs();

  currentTarget = null;
}

function enableMbtigounghabs() {
  document.getElementById('mbti-grid').style.display = 'grid';
}

function disableMbtigounghabs() {
  document.getElementById('mbti-grid').style.display = 'none';
}

function getWarningMessage(score) {
  if (score <= 3) return '서로의 배려가 필요한 관계예요! 서로의 다름을 인정하고 존중하는 노력이 필요합니다!';
  if (score <= 6) return '비슷한 점과 다른 점이 공존하는 보통 관계예요! 충분한 대화를 통해 갈등을 줄이고 서로의 방식을 이해하는 노력이 필요합니다!';
  return '멋진 관계가 될 수 있어요! 자연스러운 소통이 가능하며 서로에게 의지되는 존재가 될 수 있습니다!';
}

function restart() {
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('select-page').style.display = 'block';
    
    
    document.getElementById('me-result').innerHTML = '';
    document.getElementById('you-result').innerHTML = '';
    
      document.getElementById('me-button').style.display = 'inline-block';
      document.getElementById('you-button').style.display = 'inline-block';

      currentTarget = null;
      meSelected = null;
      youSelected = null;

      disableMbtigounghabs();
}

function getRelationshipComment(score) {
    if (score <= 3) return '노력이 필요한 관계예요...';
    if (score <= 6) return '보통이에요!';
    return '최고의 상대를 찾았어요!';
}

function getExpressionImage(score) {
    if (score <= 3) return "image/down.png";
    if (score <= 6) return "image/middle.png";
    return "./image/high.png";
}

document.addEventListener("DOMContentLoaded", () => {
    disableMbtigounghabs();
});

document.addEventListener("DOMContentLoaded", () => {
    const resultButton = document.getElementById("result-btn");
    resultButton.addEventListener("click", showResultPage);
});

function showResultPage() {
    const me = meSelected;
    const you = youSelected;

    if (!me || !you) {
    alert("MBTI를 모두 선택해주세요!");
    return;
  }

    const score = mbtiScoreMap[me]?.[you];
    const warning = getWarningMessage(score); 
    const faceImage = getExpressionImage(score);

    document.getElementById("select-page").style.display = "none";
    document.getElementById("result-page").style.display = "block";

    document.getElementById("result-score").textContent = `${score}점`;
    document.getElementById("result-comment").textContent = "우리의 MBTI 궁합 점수예요!";
    document.getElementById("result-warning").textContent = warning || "";

    document.getElementById("face-left").src = `mbtiemoji/${me}.png`;
    document.getElementById("face-right").src = `mbtiemoji/${you}.png`;

    document.getElementById("me-mbti-label").textContent = me;
    document.getElementById("you-mbti-label").textContent = you;
}
