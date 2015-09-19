chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'skip') {
    // Click the next button on the page to move on the to the next image in the
    // Imgur gallery
    var nextButton = document.querySelector('.navNext');
    nextButton.click();
  }
});