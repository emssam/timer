const speech = new SpeechSynthesisUtterance();
speech.lang = "ko-KR";

const timerEl = document.getElementById("timer");
const buttons = document.getElementsByClassName("button");

let intervalId;
let remainingTime;

function startTimer(time, message) {
  remainingTime = time;
  updateTimer();
  intervalId = setInterval(updateTimer, 1000);
  speech.text = message;
  window.speechSynthesis.speak(speech);
}

function updateTimer() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerEl.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  remainingTime--;
   
  if (remainingTime === 0) {
    clearInterval(intervalId);
    nextButton();
  }
}

function nextButton() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains("active")) {
      buttons[i].classList.remove("active");
      if (i < buttons.length - 1) {
        buttons[i + 1].classList.add("active");
        const time = parseInt(buttons[i + 1].textContent.split("(")[1].split(")")[0]);
        startTimer(time * 60, buttons[i + 1].textContent.split("(")[0]+ "을 시작하겠습니다.");
        break;
      }
    }
  }
}

function stopTimer() {
  clearInterval(intervalId);
  remainingTime = 0;
  updateTimer();
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (intervalId) {
      clearInterval(intervalId);
    }
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove("active");
    }
    this.classList.add("active");
    const time = parseInt(this.textContent.split("(")[1].split(")")[0]);
    startTimer(time * 60, this.textContent.split("(")[0]+ "을 시작하겠습니다.");
  });
}



buttons[3].addEventListener("click", function () {
  stopTimer();
  speech.text = "수업이 종료되었습니다.";
  window.speechSynthesis.speak(speech);
});
