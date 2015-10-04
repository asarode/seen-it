'use strict';

import { storage } from '../utils';

const goToUnseen = (history) => {
  let imageList = document.querySelectorAll('.items > a');
  for (var i = 0; i < imageList.length; i++) {
    let linkId = parseIdFromNode(imageList[i]);
    if (!history[linkId]) {
      imageList[i].click();
      break;
    }
    else if (i === imageList.length - 1) {
      imageList[i].click();
    }
  }
}

/**
 * Gets the image id from an element in the sidebar
 * @param  {Object} node The DOM element to get the id from
 * @return {String}      The image id
 *
 * @private
 */
const parseIdFromNode = (node) => {
  let attr = node.getAttribute('data-reactid');
  let startIndex = attr.lastIndexOf('$') + 1;
  return attr.substring(startIndex);
}

export default {
  goToUnseen
};
