window.onload = function () {
  const params = new URLSearchParams(location.search);
  const mbti = params.get("mbti");
  const traitsParam = params.get("traits");

  const data = resultData[mbti];
  const userTraits = traitsParam ? JSON.parse(decodeURIComponent(traitsParam)) : null;

  if (!data || !userTraits) {
    document.getElementById("mbti-result").textContent = "결과를 불러올 수 없습니다.";
    return;
  }

  const mbtiImage = document.getElementById("mbti-image");
  mbtiImage.src = `./mbtiemoji/${mbti}.png`;
  mbtiImage.alt = `${mbti} 이미지`;

  document.getElementById("mbti-result").textContent = mbti;
  document.querySelector(".nickname").textContent = data.nickname;

  const traitColors = [
    ["#4674a0", "#f6c297"], // E / I
    ["#a9cc7d", "#89a9a8"], // S / N
    ["#6c9142", "#cba36f"], // T / F
    ["#8dbbb1", "#c8d0ae"]  // J / P
  ];

  const traitNames = [
    ["외향형", "내향형"],
    ["감각형", "직관형"],
    ["사고형", "감정형"],
    ["판단형", "인식형"]
  ];

  const bars = document.querySelectorAll(".trait-bar");

  bars.forEach((bar, i) => {
    const val = userTraits[i];
    const leftPercent = 100 - val;
    const rightPercent = val;

    const leftFill = bar.querySelector(".left-fill");
    const rightFill = bar.querySelector(".right-fill");
    const circle = bar.querySelector(".circle");
    const label = bar.querySelector(".trait-label");
    const leftLabel = bar.querySelector(".left-label");
    const rightLabel = bar.querySelector(".right-label");

    leftFill.style.width = `${leftPercent}%`;
    leftFill.style.backgroundColor = traitColors[i][0];

    rightFill.style.width = `${rightPercent}%`;
    rightFill.style.backgroundColor = traitColors[i][1];

    circle.style.left = `${leftPercent}%`;
    circle.style.borderColor = traitColors[i][1];

    label.textContent = `${Math.max(leftPercent, rightPercent)}% ${val > 50 ? traitNames[i][1] : traitNames[i][0]}`;
    leftLabel.textContent = traitNames[i][0];
    rightLabel.textContent = traitNames[i][1];
  });

  document.querySelector(".career-tags").innerHTML = data.career
    .map(job => `<div class="tag">${job}</div>`)
    .join("");

  document.getElementById("growth").textContent = data.growth;
  document.getElementById("relationship").textContent = data.relationship;
  document.querySelector(".mbti-description").textContent = data.description;

  document.querySelector(".mbti-celebrities").innerHTML =
  `<div class="celeb-tags">` +
  data.celebrities.map(name => `<div class="tag">${name}</div>`).join("") +
  `</div>`;

  document.querySelector(".mbti-strengths").innerHTML =
  data.strengths.map(item => `<li>${item}</li>`).join("") + `</ul>`;

  document.querySelector(".mbti-weaknesses").innerHTML =
  data.weaknesses.map(item => `<li>${item}</li>`).join("") + `</ul>`;

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

};
