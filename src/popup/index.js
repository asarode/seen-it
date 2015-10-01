'use strict';

import { storage } from '../utils';

/**
 * Toggles the skip option in response to the skip checkbox being changed
 * @param  {Object} e The skip checkbox change event
 */
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

/**
 * Toggles the storage option in response to the storage checkbox being changed
 * @param  {Object} e The storage checkbox change event
 */
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

/**
 * Clears all the history in response to the clear button being clicked
 * @param  {Object} e The clear button click event
 */
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
  document.getElementById('skip-box').checked = storage.getSkipSetting();
  document.getElementById('store-box').checked = storage.getStoreSetting();
}

/**
 * Handles setting up the DOM after it is loaded. Sets the option fields to the
 * appropriate value based on the options in storage.
 */
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
