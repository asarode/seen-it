'use strict';

import { storage } from '../utils';

const init = () => {
  chrome.tabs.onUpdated.addListener(checkForImgurUrl);
  chrome.extension.onMessage.addListener(onMessage);
}

/**
 * Executes the correct handler function based on which message was passed
 * @param  {Object} msg          The message from the sender
 * @param  {Object} sender       The sender of the message
 * @param  {Object} sendResponse What to send back to the sender after handling
 *                               the message
 */
const onMessage = (msg, sender, sendResponse) => {
  switch (msg.action) {
    case 'enableSkips':
      enableSkips();
      break;
    case 'disableSkips':
      disableSkips();
      break;
    case 'toggleSkips':
      toggleSkips();
    case 'enableStoring':
      enableStoring();
      break;
    case 'disableStoring':
      disableStoring();
      break;
    case 'toggleStoring':
      toggleStoring()
      break;
    case 'clearSkips':
      clearSkips();
      break;
    default:
      console.warn('Unrecognized message: ' + msg.action);
  }
}

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
  let history = storage.getHistory();
  // Store the image if it hasn't been seen and storing is enabled
  if (!history[imageId]) {
    storeImage(imageId);
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
  if (!storage.getSkipSetting()) {
    return;
  }
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'skip',
      payload: {
        history: storage.getHistory()
      }
    }, response => {
      // put response from message here if needed
    });
  });
}

const storeImage = (id) => {
  if (!storage.getStoreSetting()) {
    return;
  }
  storage.storeImageId(id);
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
const enableSkips = () => {
  storage.setSkipSetting(true);
  // consider taking this out so enabling skipping doesn't immediately make the
  // user move ahead
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    processUrl(tabs[0].url);
  });
}

/**
 * Disables skipping images
 */
const disableSkips = () => {
  storage.setSkipSetting(false);
}

/**
 * Toggles the skipping option
 */
const toggleSkips = () => {
  if (storage.getSkipSetting()) {
    disableSkips();
  } else {
    enableSkips();
  }
}

/**
 * Enables storing images that are being seen
 */
const enableStoring = () => {
  storage.setStoreSetting(true);
}

/**
 * Disables storing images that are being seen
 */
const disableStoring = () => {
  storage.setStoreSetting(false);
}

/**
 * Toggles the storing option
 */
const toggleStoring = () => {
  if (storage.getStoreSetting()) {
    disableStoring();
  } else {
    enableStoring();
  }
}

/**
 * Clears all images currently stored in local storage
 */
const clearSkips = () => {
  storage.setHistory({});
}

init();
