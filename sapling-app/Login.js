import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Alert,
    Image,
    Keyboard,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    WebView,
} from "react-native";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

/* Stack Navigator*/
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Assets, createStackNavigator } from '@react-navigation/stack';

/* Styles */
import { styles } from './Styles.js';

let customFonts = {
  'RubikRegular': require('./assets/fonts/Rubik/static/Rubik-Regular.ttf'),
  'RubikBold': require('./assets/fonts/Rubik/static/Rubik-Bold.ttf'),
}

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fontsLoaded: false
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts).then(() => this.setState({ fontsLoaded: true }))
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  handleSubmit() {
    if (!this.state.username) {
      Alert.alert('Please enter your username.')
    } else {
      this.props.navigation.navigate('PodsHome')
      console.log(this.state.username)
      /* PASS USERNAME INFO */
    }
  }

  render() {
    //return(<AppLoading></AppLoading>)

      return (
        <View style={styles.container}>
          <Text style={styles.header1}>Welcome to Sapling</Text>
          <Text style={styles.subtitle}>Please enter your username</Text>
          <TextInput
            style={[styles.textInput]}
            placeholder = 'Username'
            autoCapitalize='none'
            multiline={false}
            onSubmitEditing = {() => Keyboard.dismiss()}
            onChangeText = {(text) => this.setState({username: text})}
          />

          <TouchableOpacity
              onPress={() => this.handleSubmit()}>
              <Text>Let's go!</Text>
          </TouchableOpacity>
        </View>
      )
  }
}

export {Login}
