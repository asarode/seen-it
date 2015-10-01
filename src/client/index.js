'use strict';

import skipper from './skipper';
import keyboard from './keyboard';
import {listenButtonClick, listenKeyShortcuts}  from './nav';

const init = () => {
  chrome.extension.onMessage.addListener(onMessage);
  window.addEventListener('keydown', keyboard.onHotKey, false);
  listenButtonClick();
  listenKeyShortcuts();
}

/**
 * Executes the correct handler function based on which message was passed
 * @param  {Object} msg          The message from the sender
 * @param  {Object} sender       The sender of the message
 * @param  {Object} sendResponse What to send back to the sender after handling
 *                               the message
 */
const onMessage = (msg, sender, sendResponse) => {
  if (msg.action === 'skip') {
    skipper.goToUnseen(msg.payload.history);
  }
}

init();
