// background.js

let countdownInterval;
let remainingTime = 0;
let originalTime = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let msg=request.message
  if (msg === 'refresh') {
    // Your logic for refreshing the page goes here
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.reload(tabs[0].id);
    });

    // Start a new countdown after refreshing
    startCountdown(originalTime);
  }
});

function startCountdown(time) {
  originalTime = time;
  remainingTime = time;
  clearInterval(countdownInterval);

  countdownInterval = setInterval(function() {
    if (remainingTime > 0) {
      remainingTime--;
    } else {
      // Perform actions after countdown reaches zero
      // For example, refresh the page
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });

      // Start a new countdown after refreshing
      startCountdown(originalTime);
    }
  }, 1000);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'startCountdown') {
    const time = request.time;
    startCountdown(time);
  } else if (request.message === 'stopCountdown') {
    clearInterval(countdownInterval);
  }
});
