'use strict';

/**
 * Toggles the skipping or the storing in response to a hotkey being pressed
 * @param  {Object} e The keyboard event
 */
const onHotKey = (e) => {
  if (e.keyCode == "90" && e.altKey) { // Pressed z key
    chrome.extension.sendMessage({
      action: 'toggleSkips'
    });
  } else if (e.keyCode == "88" && e.altKey) { // Pressed x key
    chrome.extension.sendMessage({
      action: 'toggleStoring'
    });
  }
}

export default {
  onHotKey
}
