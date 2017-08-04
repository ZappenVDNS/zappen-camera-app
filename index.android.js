/**
 * React Native Navigation App
 * https://github.com/jlsuarezs/ReactNativeNavigationExample
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  }
});

AppRegistry.registerComponent('Zappen', () => App);

