import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    WebView,
} from "react-native";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

/* Stack Navigator*/
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Assets, createStackNavigator } from '@react-navigation/stack';

/* Dimensions */
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/* Styles */
import { styles } from '../../Styles.js';

let customFonts = {
  'RubikRegular': require('../../assets/fonts/Rubik/static/Rubik-Regular.ttf'),
  'RubikBold': require('../../assets/fonts/Rubik/static/Rubik-Bold.ttf'),
}

export default class PodTile extends React.Component {

  constructor({navigation, route}) {
    super();
  }

  handleTile() {
    this.props.navigation.navigate('Example')
  }


  render() {
    return (
      <TouchableOpacity
        onPress={() => this.handleTile()}
        style={[styles.podTile, {width: windowWidth / 2.5, height: windowHeight / 3}]}>
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

export {PodTile}
