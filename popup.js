let countdownInterval;
let remainingTime = 0;

function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startCountdown() {
  countdownInterval = setInterval(function () {
    if (remainingTime > 0) {
      remainingTime--;
      updateTimerDisplay();
    } else {
      clearInterval(countdownInterval);
      chrome.runtime.sendMessage({ message: 'refresh'});
    }
  }, 1000);
}

const gb=document.getElementById('goButton')

document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready!');
    const goButton = document.getElementById('goButton');
    console.log('goButton:', goButton);
  
    goButton.addEventListener('click', function() {
      console.log('Button clicked!');
      const inputSeconds = parseInt(prompt('Enter seconds:'));

        if (!isNaN(inputSeconds)) {
            remainingTime = inputSeconds;
            updateTimerDisplay();
            startCountdown();
            document.getElementById('goButton').disabled = true;
            document.getElementById('stopButton').disabled = false;
        } else {
            alert('Invalid input. Please enter valid numbers.');
        }
    });
});
  
document.addEventListener('DOMContentLoaded', function(){
    const stopButton = document.getElementById('stopButton');
    stopButton.addEventListener('click', function() {
        clearInterval(countdownInterval);
        remainingTime = 0;
        updateTimerDisplay();
        document.getElementById('goButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    });
});

