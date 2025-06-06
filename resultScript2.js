window.onload = function () {
  const params = new URLSearchParams(location.search);
  const mbti = params.get("mbti");

  const data = resultData[mbti];

  if (!data) {
    document.getElementById("mbti-result").textContent = "결과를 불러올 수 없습니다.";
    return;
  }


  document.getElementById("mbti-result").textContent = mbti;

  const mbtiImage = document.getElementById("mbti-image");
  mbtiImage.src = `./mbtiemoji/${mbti}.png`;
  mbtiImage.alt = `${mbti} 이미지`;

  document.querySelector(".nickname").textContent = data.nickname;
  document.querySelector(".mbti-description").textContent = data.description;

  document.querySelector(".career-tags").innerHTML = data.career
    .map(job => `<div class="tag">${job}</div>`).join("");

  document.getElementById("growth").textContent = data.growth;
  document.getElementById("relationship").textContent = data.relationship;

  document.querySelector(".mbti-celebrities").innerHTML =
    `<div class="celeb-tags">` +
    data.celebrities.map(name => `<div class="tag">${name}</div>`).join("") +
    `</div>`;

  document.querySelector(".mbti-strengths").innerHTML =
    data.strengths.map(item => `<li>${item}</li>`).join("");

  document.querySelector(".mbti-weaknesses").innerHTML =
    data.weaknesses.map(item => `<li>${item}</li>`).join("");

  const matchGood = data.matchGood || [];
  const matchBad = data.matchBad || [];

  const goodHtml = matchGood.map(m =>
    `<div><span class="match-good">👍 ${m.type}</span><span class="match-desc"> - ${m.summary}</span></div>`
  ).join("");

  const badHtml = matchBad.map(m =>
    `<div><span class="match-bad">👎 ${m.type}</span><span class="match-desc"> - ${m.summary}</span></div>`
  ).join("");

  document.getElementById("matchGood").innerHTML = goodHtml;
  document.getElementById("matchBad").innerHTML = badHtml;
}