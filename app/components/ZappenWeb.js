0/**
 * Zappen React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Image, View, WebView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

class ZappenWeb extends Component { 
    static navigationOptions = {
       title: "Zapp",  
    };

    render() {
        //const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
    	return (
        <View style={{flex: 1 }}>
            <WebView
	 	     style={{flex: 1 }}	
             source={{uri: params.url}}
             />
	     </View>
    	);
    }   
}

module.exports = ZappenWeb;
