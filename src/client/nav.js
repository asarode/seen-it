'use strict';

/**
 * Tries to get the prev and next button with their classname,
 * listens to mouseclick event and delegate to navHandler.
 */
const listenButtonClick = () => {
  let nextButton = document.querySelector('.navNext')[0];
  let prevButton = document.querySelector('.navPrev')[0];
  if (nextButton && prevButton) {
    nextButton.addEventListener('mouseclick', navHandler.bind(null, 'next'));
    prevButton.addEventListener('mouseclick', navHandler.bind(null, 'prev'));
  }
}

/**
 * Listens to right and left arrow keys (which are shortcuts for prev and next) and delegate to navHandler.
 */
const listenKeyShortcuts = () => {
  window.addEventListener('keydown', (e) => {
    if (e.target != document.body) {
      return;
    }
    switch(e.which){
      case 37 :
        navHandler('prev', e);
        break;
      case 39 :
        navHandler('next', e);
        break;
    }
  })
}

/**
 * Called when a perv or next action is catched.
 * Sends a 'navCatched' action to the background script.
 * The background script should know how to interpret the action, and decide to disable the skip.
 * @param {String}   direction
 * @param {DOMevent} e
 */
const navHandler = (direction, e) => {
  chrome.extension.sendMessage({
    action: 'navCatched',
    payload: {
      direction,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey
    }
  });
}

export default {
  listenButtonClick,
  listenKeyShortcuts
};
