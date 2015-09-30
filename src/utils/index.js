'use strict';

import { keys } from '../constants';

/**
 * Gets the parsed history object from storage
 * @return {Object} The parsed image history, or an empty object if there is
 *                  no history object saved to storage
 */
export const getHistory = () => {
  let stringified = localStorage.getItem(keys.HISTORY);
  return safeCheckObj(stringified);
}

/**
 * Sets the history object and saves `it to storage
 * @param  {Object} obj An object containing image ids as keys
 */
export const setHistory = (obj) => {
  if (!getStoreSetting()) {
    return;
  }
  localStorage.setItem(keys.HISTORY, JSON.stringify(obj));
}

/**
 * Gets the skip setting saved in storage
 * @return {Boolean} `true` if skipping is enabled, `false` if disabled
 */
export const getSkipSetting = () => {
  let skipString = localStorage.getItem(keys.SKIPS);
  return safeCheckBool(skipString);
}

/**
 * Sets the skip setting and saves it to storage
 * @param  {Boolean} value `true` to enable skipping, `false` to disable it
 */
export const setSkipSetting = (value) => {
  localStorage.setItem(keys.SKIPS, String(value));
}

/**
 * Gets the store setting saved in storage
 * @return {Boolean} `true` if storing is enabled, `false` if disabled
 */
export const getStoreSetting = () => {
  let storeString = localStorage.getItem(keys.STORE);
  return safeCheckBool(storeString);
}

/**
 * Sets the store setting and saves it to storage
 * @param  {Boolean} value `true` to enable skipping, `false` to disable it
 */
export const setStoreSetting = (value) => {
  localStorage.setItem(keys.STORE, String(value));
}

/**
 * Checks a strigified boolean and defaults to `true` if the string is `null`
 * @param  {String} stringValue The stringified bool
 * @return {Boolean}            `true` if the string is null or it represents
 *                              true, `false` otherwise
 */
const safeCheckBool = (stringValue) => {
  return stringValue !== null ? stringValue === 'true' : true;
}

/**
 * Parses a stringified object and defaults to an empty object if the object is
 * `null`
 * @param  {String} stringValue The stringified object
 * @return {Object}             An empty object if `stringValue` was `null`,
 *                              otherwise returns the object parsed from the
 *                              given string
 */
const safeCheckObj = (stringValue) => {
  return stringValue !== null ? JSON.parse(stringValue) : {};
}
