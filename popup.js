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
  // var enableSkipsButton = document.getElementById('enable-skips');
  // passLog(enableSkipsButton);
  document.getElementById('enable-skips')
    .addEventListener('click', onEnable);

  document.getElementById('disable-skips')
    .addEventListener('click', onDisable);

  document.getElementById('clear-skips')
    .addEventListener('click', onClearSkips);
}

function passLog(log) {
  chrome.extension.sendMessage({
    action: 'log',
    log: log
  });
}

document.addEventListener('DOMContentLoaded', onDomLoaded);
