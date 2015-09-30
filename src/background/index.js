'use strict';

import * as utils from '../utils';

const init = () => {
  chrome.tabs.onUpdated.addListener(checkForImgurUrl);
}

/**
 * Handler for messages passed to background.js
 * @param  {Object} msg           The message payload object passed
 * @param  {[type]} sender        Who the message is coming from
 * @param  {[type]} sendResponse) Chrome's sendResponse param
 */
chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.action) {
    case 'enableSkips':
      onEnableSkips();
      break;
    case 'disableSkips':
      onDisableSkips();
      break;
    case 'enableStoring':
      onEnableStoring();
      break;
    case 'disableStoring':
      onDisableStoring();
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

/**
 * Checks if the tab is on Imgur to decide whether to load the page action
 * @param  {String} tabId      chrome.tabs.onUpdate's tabId param
 * @param  {Object} changeInfo chrome.tabs.onUpdate's changeInfo param
 * @param  {Object} tab        chrome.tabs.onUpdate's tab param
 */
const checkForImgurUrl = (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (tab.url.indexOf('//imgur.com') !== 1) {
      chrome.pageAction.show(tabId);
      processUrl(tab.url);
    } else {
      chrome.pageAction.hide(tabId);
    }
  }
}

/**
 * Handles logic for what to do with the current image URL
 * @param  {String} url The current URL of the Imgur page
 */
const processUrl = (url) => {
  // Don't process the URL if it isn't a gallery link
  // Gallery links are in the form '*/gallery/imageId'
  if (url.indexOf('gallery') === -1) {
    return;
  }

  let imageId = parseId(url);
  let history = utils.getHistory();
  // Store the image if it hasn't been seen and storing is enabled
  if (!history[imageId]) {
    history[imageId] = Date.now();
    utils.setHistory(history);
  }
  // Otherwise skip the image if it has been seen and skipping is enabled
  else {
    skipImage();
  }
}

/**
 * Passes a message to the content script to skip the image
 */
const skipImage = () => {
  if (!utils.getSkipSetting()) {
    return;
  }
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'skip',
      history: utils.getHistory()
    }, response => {
      // put response from message here if needed
    });
  });
}

const parseId = (url) => {
  let idStart = url.lastIndexOf('/') + 1;
  let idEnd = url.indexOf('?');
  if (idEnd === -1) {
    idEnd = url.length;
  }
  return url.substring(idStart, idEnd);
}

/**
 * Enables skipping images
 */
const onEnableSkips = () => {
  utils.setSkipSetting(true);
  // consider taking this out so enabling skipping doesn't immediately make the
  // user move ahead
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    processUrl(tabs[0].url);
  });
}

/**
 * Disables skipping images
 */
const onDisableSkips = () => {
  utils.setSkipSetting(false);
}

/**
 * Enables storing images that are being seen
 */
const onEnableStoring = () => {
  utils.setStoreSetting(true);
}

/**
 * Disables storing images that are being seen
 */
const onDisableStoring = () => {
  utils.setStoreSetting(false);
}

/**
 * Clears all images currently stored in local storage
 */
const onClearSkips = () => {
  utils.setHistory({});
}

init();
