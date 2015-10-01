chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'skip') {
    // Click the next button on the page to move on the to the next image in the
    // Imgur gallery
    // var nextButton = document.querySelector('.navNext');
    // nextButton.click();
    var isList = document.querySelector('.items.list');
    var imageList = document.querySelectorAll('.items > a');

    for (var i = 0; i < imageList.length; i++) {
      var linkId;
      if (isList) {
        linkId = getIdFromListItem(imageList[i].getAttribute('data-reactid'));
      } else {
        linkId = getIdFromGridItem(imageList[i].getAttribute('href'));
      }
      if (!msg.history[linkId]) {
        imageList[i].click();
        break;
      }
      else if (i === imageList.length - 1) {
        imageList[i].click();
      }
    }
  }
});

function getIdFromGridItem(attr) {
  var startIndex = attr.lastIndexOf('/') + 1;
  return attr.substring(startIndex);
}

function getIdFromListItem(attr) {
  var startIndex = attr.lastIndexOf('$') + 1;
  return attr.substring(startIndex);
}