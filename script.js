let startTime;
let elapsedTime = 0;
let timerInterval;

function timeToString(time) {
  const diff = new Date(time);
  const hours = diff.getUTCHours().toString().padStart(2, '0');
  const minutes = diff.getUTCMinutes().toString().padStart(2, '0');
  const seconds = diff.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = diff.getUTCMilliseconds().toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startStopwatch() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      document.getElementById("display").textContent = timeToString(elapsedTime);
    }, 10);
  }
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetStopwatch() {
  pauseStopwatch();
  elapsedTime = 0;
  document.getElementById("display").textContent = "00:00:00.000";
  document.getElementById("laps").innerHTML = "";
}

function recordLap() {
  if (!timerInterval) return;
  const lapTime = timeToString(elapsedTime);
  const lapItem = document.createElement("div");
  lapItem.className = "lap";
  lapItem.textContent = `Lap ${document.getElementById("laps").children.length + 1}: ${lapTime}`;
  document.getElementById("laps").prepend(lapItem);
}