"use strict";

// This module exports a utility function for simulating
// delay (for example, in network or file system operations)
// using the builtin setTimeout.
//
// This is used to make the front-end behaviour a little more
// realistic even while we use a simplistic "in-memory" db.

const someMilliseconds = () => {
  return Math.floor(Math.random() * 400) + 100;
};

const simulateDelay = (callback) => {
  setTimeout(callback, someMilliseconds());
};

module.exports = simulateDelay;

