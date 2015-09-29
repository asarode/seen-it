chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'skip') {
    // Click the next button on the page to move on the to the next image in the
    // Imgur gallery
    // var nextButton = document.querySelector('.navNext');
    // nextButton.click();
    var imageList = document.querySelectorAll('.items > a');
    for (var i = 0; i < imageList.length; i++) {
      var linkId = imageList[i].getAttribute('href');
      var startIndex = linkId.lastIndexOf('/') + 1;
      var cleanLinkId = linkId.substring(startIndex);
      if (!msg.history[cleanLinkId]) {
        imageList[i].click();
        break;
      }
    }
  }
});
