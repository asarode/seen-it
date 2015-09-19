'use strict';

function onEnable(e) {
  chrome.extension.sendMessage({
    action: enableSkips
  });
}

function onDisable(e) {
  chrome.extension.sendMessage({
    action: disableSkips
  });
}

function onClearSkips(e) {
  chrome.extension.sendMessage({
    action: clearSkips
  });
}

function onDomLoaded() {
  passLog(window);
  document.getElementById('enable-skips')
    .addEventListener('click', onEnable);

  document.getElementById('disable-skips')
    .addEventListener('click', onDisable);

  document.getElementById('clear-skips')
    .addEventListener('click', onClearSkips);
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
