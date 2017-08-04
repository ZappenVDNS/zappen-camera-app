/**
 * React Native Navigation App
 * https://github.com/jlsuarezs/ReactNativeNavigationExample
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  Image,
  View,
  WebView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
   
var ZappenWeb = require ('./app/components/ZappenWeb');
var ZappenCamera = require ('./app/components/ZappenCamera');

const App = StackNavigator({
    Home: { screen: ZappenCamera },
    Web: { screen: ZappenWeb },
    Camera: { screen: ZappenCamera },
});

AppRegistry.registerComponent('Zappen', () => App);
