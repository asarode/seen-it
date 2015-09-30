'use strict';

import * as utils from '../utils';

const onSkipChanged = (e) => {
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

const onStoreChanged = (e) => {
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

const onClearSkips = (e) => {
  chrome.extension.sendMessage({
    action: 'clearSkips'
  });
  var clearButtonContent = document.getElementById('clear-button-content');
  clearButtonContent.innerHTML = 'Images cleared'
  setTimeout(() => {
    clearButtonContent.innerHTML = 'Clear seen images'
  }, 1000)
}

/**
 * Restore the user's options based on what's in local storage
 */
const restoreOptions = () => {
  document.getElementById('skip-box').checked = utils.getSkipSetting();
  document.getElementById('store-box').checked = utils.getStoreSetting();
}

const onDomLoaded = () => {
  restoreOptions();
  document.getElementById('skip-box')
    .addEventListener('change', onSkipChanged);

  document.getElementById('store-box')
    .addEventListener('change', onStoreChanged);

  document.getElementById('clear-skips-button')
    .addEventListener('click', onClearSkips);
}

document.addEventListener('DOMContentLoaded', onDomLoaded);
