'use strict';

var seenItKey = 'seen-it-ndpkdkckdhfanagkhmjicjhdlmfaacmb';
var enableSkipsKey = seenItKey + '-skips';

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  switch (msg.action) {
    case 'enableSkips':
      onEnableSkips();
      break;
    case 'disableSkips':
      onDisableSkips();
      break;
    case 'clearSkips':
      onClearSkips();
      break;
    case 'log':
      onLog(msg.log);
      break;
    default:
      console.warn('Unrecognized message: ' + msg.action);
  }
});

function checkForImgurUrl(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    if (tab.url.indexOf('http://imgur.com') === 0) {
      chrome.pageAction.show(tabId);
      processUrl(tab.url);
    } else {
      chrome.pageAction.hide(tabId);
    }
  }
}

function processUrl(url) {
  var idStart = url.lastIndexOf('/') + 1;
  if (idStart === 0) {
    return;
  }
  var imageId = url.substring(idStart);
  var images = getImageObj();
  console.log(images);
  console.log(localStorage.getItem(enableSkipsKey));
  if (!localStorage.getItem(enableSkipsKey)) {
    return;
  }

  if (!images[imageId]) {
    console.log('storing image: ' + imageId);
    images[imageId] = Date.now();
    localStorage.setItem(seenItKey, JSON.stringify(images));
  } else {
    console.log('skipping image: ' + imageId);
    skipImage();
  }
}

function skipImage() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'skip'}, function(response) {
      // put response from message here if needed
    });
  });
}

function getImageObj() {
  var imageString = localStorage.getItem(seenItKey);
  return imageString ? JSON.parse(imageString) : {};
}

function onEnableSkips() {
  console.log('enable skips');
  localStorage.setItem(enableSkipsKey, true);
}

function onDisableSkips() {
  console.log('disable skips');
  localStorage.setItem(enableSkipsKey, false);
}

function onClearSkips() {
  console.log('clear skips');
  localStorage.removeItem(seenItKey);
}

function onLog(log) {
  console.log(log);
}

function init() {
  localStorage.clear();
  var skipsEnabled = localStorage.getItem(enableSkipsKey);
  if (skipsEnabled === null) {
    localStorage.setItem(enableSkipsKey, true);
  }
}

chrome.tabs.onUpdated.addListener(checkForImgurUrl);
init();
