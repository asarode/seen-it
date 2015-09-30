'use strict';

function onSkipChanged(e) {
  if (e.target.checked) {
    chrome.extension.sendMessage({
      action: 'enableSkips'
    });
  } else {
    chrome.extension.sendMessage({
      action: 'disableSkips'
    });
  }
}

function onStoreChanged(e) {
  if (e.target.checked) {
    chrome.extension.sendMessage({
      action: 'enableStoring'
    });
  } else {
    chrome.extension.sendMessage({
      action: 'disableStoring'
    });
  }
}

function onClearSkips(e) {
  chrome.extension.sendMessage({
    action: 'clearSkips'
  });
  var clearButtonContent = document.getElementById('clear-button-content');
  clearButtonContent.innerHTML = 'Images cleared'
  setTimeout(function() {
    clearButtonContent.innerHTML = 'Clear seen images'
  }, 1000)
}

function onDomLoaded() {
  restoreOptions();
  document.getElementById('skip-box')
    .addEventListener('change', onSkipChanged);

  document.getElementById('store-box')
    .addEventListener('change', onStoreChanged);

  document.getElementById('clear-skips-button')
    .addEventListener('click', onClearSkips);
}

/**
 * Restore the user's options based on what's in local storage
 */
function restoreOptions() {
  var seenItKey = 'seen-it-ndpkdkckdhfanagkhmjicjhdlmfaacmb';
  var skipsKey = seenItKey + '-skips';
  var storeKey = seenItKey + '-storing';

  if (localStorage.getItem(skipsKey) === 'true') {
    document.getElementById('skip-box').checked = true;
  }
  if (localStorage.getItem(storeKey) === 'true') {
    document.getElementById('store-box').checked = true;
  }
}

/**
 * Helper function to pass something to get console.log'ed in background.js
 * @param  {Any} log What you want to log out
 */
function passLog(log) {
  chrome.extension.sendMessage({
    action: 'log',
    log: log
  });
}

document.addEventListener('DOMContentLoaded', onDomLoaded);
