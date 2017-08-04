# react-native-catch-first-time

Rejects promise when your app is running for the first time.

Useful when providing a first-login experience.

# Usage

```javascript
var firstTime = require('react-native-catch-first-time');
var DeviceInfo = require('react-native-device-info');

firstTime(DeviceInfo.getUniqueID())
  .catch(function () {
    navigator.push({
      component: AppIntro
    })
  });
```

# Why not resolving into `.then` branch?

Putting your code into a `.catch` clause allows you not specifying
the `.then` handler, which wouldn't be true in the opposite case.

# Choosing on UID

The recommended way is to use device's UUID. You can obtain one using
[react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)
or [react-native-device-uuid](https://github.com/lazywei/react-native-device-uuid)
libraries.

If you prefer not to catch on the first time after reinstalling the app,
put a random string into your config and never change it.

# License

MIT

2016
