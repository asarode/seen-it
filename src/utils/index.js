'use strict';

/**
 * Utils are functions that are useful for multiple modules in the rest of the
 * app. They should be split up by functionality. Currently, each utils module
 * is exported in its own namespace.
 * Ex. The storage util functions are available under utils.storage.
 */

export { default as storage } from './storageHelpers';
