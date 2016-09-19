'use strict';

import { keys } from '../constants';

/**
 * Gets the parsed history object from storage
 * @return {Object} The parsed image history, or an empty object if there is
 *                  no history object saved to storage
 */
const getHistory = () => {
  const stringified = safeGetStorage(keys.HISTORY);
  return safeGetObj(stringified);
}

/**
 * Sets the history object and saves it to storage
 * @param  {Object} obj An object containing image ids as keys
 */
const setHistory = (obj) => {
  if (!getStoreSetting()) {
    return;
  }
  safeSetStorage(keys.HISTORY, obj);
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
  const skipString = safeGetStorage(keys.SKIPS);
  return safeGetBool(skipString);
}

/**
 * Sets the skip setting and saves it to storage
 * @param  {Boolean} value `true` to enable skipping, `false` to disable it
 */
const setSkipSetting = (value) => {
  safeSetStorage(keys.SKIPS, value);
}

/**
 * Gets the store setting saved in storage
 * @return {Boolean} `true` if storing is enabled, `false` if disabled
 */
const getStoreSetting = () => {
  const storeString = safeGetStorage(keys.STORE);
  return safeGetBool(storeString);
}

/**
 * Sets the store setting and saves it to storage
 * @param  {Boolean} value `true` to enable skipping, `false` to disable it
 */
const setStoreSetting = (value) => {
  safeSetStorage(keys.STORE, value);
}

/**
 * Gets the doNotSkip flag saved in storage
 * @return  {Boolean} value `true` to disable the skip behavior on the next image.
 */
const getDoNotSkipNext = () => {
  const skipString = safeGetStorage(keys.SKIPNEXT);
  return safeGetBool(skipString, false);
}

/**
 * Sets the doNotSkip flag and saves it to storage
 * @param  {Boolean} value `true` to disable the skip behavior on the next image.
 */
const setDoNotSkipNext = (value) => {
  safeSetStorage(keys.SKIPNEXT, value);
}

/**
 * Checks a strigified boolean and defaults to `def` if the string is `null`
 * @param  {String}  stringValue The stringified bool
 * @param  {Boolean} def         The value to set if item is null
 * @return {Boolean}             `true` if the string is null or it represents
 *                               true, `false` otherwise
 * @private
 */
const safeGetBool = (stringValue, def=true) => {
  return stringValue !== null ? stringValue === 'true' : def;
}

/**
 * Parses a stringified object and defaults to `def` if the object is
 * `null`
 * @param  {String} stringValue The stringified object
 * @param  {Object} def         The value to set if item is null
 * @return {Object}             An empty object if `stringValue` was `null`,
 *                              otherwise returns the object parsed from the
 *                              given string
 * @private
 */
const safeGetObj = (stringValue, def={}) => {
  return stringValue !== null ? JSON.parse(stringValue) : def;
}

const safeSetStorage = (key, obj) => {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch(e) {}
}

const safeGetStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch(e) {}
}

export default {
  getHistory,
  setHistory,
  storeImageId,
  getSkipSetting,
  setSkipSetting,
  getStoreSetting,
  setStoreSetting,
  setDoNotSkipNext,
  getDoNotSkipNext
};
