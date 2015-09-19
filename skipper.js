chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'skip') {
    var nextButton = document.querySelector('.navNext');
    nextButton.click();
  }
});