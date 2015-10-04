'use strict';

import { storage } from '../utils';

/**
 * Tries to get the prev and next button with their classname,
 * listens to mousedown event and delegate to navHandler.
 */
const listenButtonClick = () => {
  let nextButton = document.querySelector('.navNext');
  let prevButton = document.querySelector('.navPrev');
  if (nextButton && prevButton) {
    nextButton.addEventListener('mousedown', navHandler.bind(null, 'next'));
    prevButton.addEventListener('mousedown', navHandler.bind(null, 'prev'));
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
 * Set the doNotSkipNext flag up for the next image if the shift key is down.
 * It will disable the skip.
 * @param {String}   direction
 * @param {DOMevent} e
 */
const navHandler = (direction, e) => {
  if (e.shiftKey) {
    storage.setDoNotSkipNext(true);
  }
}

export default {
  listenButtonClick,
  listenKeyShortcuts
};
