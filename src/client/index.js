chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'skip') {
    let imageList = document.querySelectorAll('.items > a');
    for (var i = 0; i < imageList.length; i++) {
      let linkId = parseIdFromNode(imageList[i]);
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

const parseIdFromNode = (node) => {
  let attr = node.getAttribute('data-reactid');
  var startIndex = attr.lastIndexOf('$') + 1;
  return attr.substring(startIndex);
}
