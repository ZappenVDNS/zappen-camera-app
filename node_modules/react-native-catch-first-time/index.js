
var React = require('react-native')
var AsyncStorage = React.AsyncStorage

var PREFIX = 'firstTime:'
var MARKER = '0'

module.exports = function (uid) {
  if (!uid) {
    throw new Error('UID string is required. Pass in a unique string '
      + 'that is not likely to change throughout the entire app '
      + 'development lifecycle.\n'
      + 'Having difficulties finding one? Grab a random string '
      + 'at https://www.guidgenerator.com and put it somewhere in your app '
      + 'code.\nNOTE: Do not type your app name!')
  }

  var storageKey = PREFIX + uid;

  return AsyncStorage.getItem(storageKey)
    .then(function (value) {
      return AsyncStorage.setItem(storageKey, MARKER)
        .then(function () {
          return !value
            ? Promise.reject('Running first time')
            : Promise.resolve('Not running first time')
        })
    })
}
