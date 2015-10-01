'use strict';

import { keys } from '../constants';

/**
 * Gets the parsed history object from storage
 * @return {Object} The parsed image history, or an empty object if there is
 *                  no history object saved to storage
 */
const getHistory = () => {
  let stringified = localStorage.getItem(keys.HISTORY);
  console.log(keys.HISTORY);
  console.log(safeGetObj(stringified));
  return safeGetObj(stringified);
}

/**
 * Sets the history object and saves `it to storage
 * @param  {Object} obj An object containing image ids as keys
 */
const setHistory = (obj) => {
  if (!getStoreSetting()) {
    return;
  }
  localStorage.setItem(keys.HISTORY, JSON.stringify(obj));
}

/**
 * Saves an image id to history
 * @param  {String} id The image id to save
 */
const storeImageId = (id) => {
  let history = getHistory();
  history[id] = Date.now();
  setHistory(history);
}

/**
 * Gets the skip setting saved in storage
 * @return {Boolean} `true` if skipping is enabled, `false` if disabled
 */
const getSkipSetting = () => {
  let skipString = localStorage.getItem(keys.SKIPS);
  return safeGetBool(skipString);
}

/**
 * Sets the skip setting and saves it to storage
 * @param  {Boolean} value `true` to enable skipping, `false` to disable it
 */
const setSkipSetting = (value) => {
  localStorage.setItem(keys.SKIPS, String(value));
}

/**
 * Gets the store setting saved in storage
 * @return {Boolean} `true` if storing is enabled, `false` if disabled
 */
const getStoreSetting = () => {
  let storeString = localStorage.getItem(keys.STORE);
  return safeGetBool(storeString);
}

/**
 * Sets the store setting and saves it to storage
 * @param  {Boolean} value `true` to enable skipping, `false` to disable it
 */
const setStoreSetting = (value) => {
  localStorage.setItem(keys.STORE, String(value));
}

/**
 * Checks a strigified boolean and defaults to `true` if the string is `null`
 * @param  {String} stringValue The stringified bool
 * @return {Boolean}            `true` if the string is null or it represents
 *                              true, `false` otherwise
 * @private
 */
const safeGetBool = (stringValue) => {
  return stringValue !== null ? stringValue === 'true' : true;
}

/**
 * Parses a stringified object and defaults to an empty object if the object is
 * `null`
 * @param  {String} stringValue The stringified object
 * @return {Object}             An empty object if `stringValue` was `null`,
 *                              otherwise returns the object parsed from the
 *                              given string
 * @private
 */
const safeGetObj = (stringValue) => {
  return stringValue !== null ? JSON.parse(stringValue) : {};
}

export default {
  getHistory,
  setHistory,
  storeImageId,
  getSkipSetting,
  setSkipSetting,
  getStoreSetting,
  setStoreSetting
};
