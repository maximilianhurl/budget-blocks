[![Build Status](https://travis-ci.org/maximilianhurl/budget-blocks.svg?branch=master)](https://travis-ci.org/maximilianhurl/budget-blocks)
[![Code Climate](https://codeclimate.com/github/maximilianhurl/budget-blocks/badges/gpa.svg)](https://codeclimate.com/github/maximilianhurl/budget-blocks)
[![Test Coverage](https://codeclimate.com/github/maximilianhurl/budget-blocks/badges/coverage.svg)](https://codeclimate.com/github/maximilianhurl/budget-blocks/coverage)

# Budget Blocks

A basic budgeting app for iOS and soon Android

![screenshot](https://raw.githubusercontent.com/maximilianhurl/budget-blocks/master/assets/screenshot.png)

## Requirements

- [NVM](https://github.com/creationix/nvm)
- [React Native](https://facebook.github.io/react-native/docs/getting-started.html#conten)
- iOS development environment


## Building the project

    nvm use
    npm install
    npm start


## Running the tests

    nvm use
    npm install
    npm test


## Running on android

    react-native run-android
    adb reverse tcp:8081 tcp:8081
    adb shell input keyevent 82
    adb logcat *:S ReactNative:V ReactNativeJS:V