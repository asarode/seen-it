'use strict';

import { storage } from '../utils';

const goToUnseen = (history) => {
  const imageList = document.querySelectorAll('.items > a');
  for (let i = 0; i < imageList.length; i++) {
    const linkId = parseIdFromNode(imageList[i]);
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
  const attr = node.getAttribute('id');
  const startIndex = 'item-'.length;
  return attr.substring(startIndex);
}

export default {
  goToUnseen
};
