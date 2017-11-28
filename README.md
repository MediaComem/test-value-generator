# test-value-generator

Utilities to generate incremental and unique values in automated tests.

[![npm version](https://badge.fury.io/js/test-value-generator.svg)](https://badge.fury.io/js/test-value-generator)
[![Dependency Status](https://gemnasium.com/badges/github.com/MediaComem/test-value-generator.svg)](https://gemnasium.com/github.com/MediaComem/test-value-generator)
[![Build Status](https://travis-ci.org/MediaComem/test-value-generator.svg?branch=master)](https://travis-ci.org/MediaComem/test-value-generator)
[![Coverage Status](https://coveralls.io/repos/github/MediaComem/test-value-generator/badge.svg?branch=master)](https://coveralls.io/github/MediaComem/test-value-generator?branch=master)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.txt)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Developed at the [Media Engineering Institute](http://mei.heig-vd.ch) ([HEIG-VD](https://heig-vd.ch)).



## Usage

This module exposes factory functions that return value generator functions when called:

```js
const testValueGenerator = require('test-value-generator');

// Create a value generator function:
const numberGenerator = testValueGenerator.incremental(i => i);
typeof(numberGenerator); // => "function"

// Generate a value by calling it:
numberGenerator(); // => 0
```

### Generating incremental values

```js
const testValueGenerator = require('test-value-generator');

// An incremental value generator helps you produce values containing
// a number that is incremented each time you use the generator.
const incrementalEmail = testValueGenerator.incremental(i => `email-${i}@example.com`);
incrementalEmail(); // => "email-0@example.com"
incrementalEmail(); // => "email-1@example.com"
incrementalEmail(); // => "email-2@example.com"
```

### Generating unique values

A value generator created with `unique` will call your function until it can
generate a value that it has not generated before. It will throw an error if it
fails after 10 attempts.

```js
const testValueGenerator = require('test-value-generator');

// A unique value generator makes sure to never produces the same value
// twice, and throws an error if it cannot.
const uniqueDiceRoll = testValueGenerator.unique(() => Math.floor(Math.random() * 6 + 1));
uniqueDiceRoll(); // => 3
uniqueDiceRoll(); // => 5
uniqueDiceRoll(); // => 6
uniqueDiceRoll(); // => 2
uniqueDiceRoll(); // => 1
uniqueDiceRoll(); // => 4
try {
  uniqueDiceRoll();
} catch(err) {
  // Error thrown: Could not generate unique value after 10 attempts.
}
```
