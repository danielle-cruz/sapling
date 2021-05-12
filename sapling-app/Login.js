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
import { styles } from './Styles.js';

let customFonts = {
  'RubikRegular': require('./assets/fonts/Rubik/static/Rubik-Regular.ttf'),
  'RubikBold': require('./assets/fonts/Rubik/static/Rubik-Bold.ttf'),
}

export default class Login extends React.Component {

  constructor({navigation, route}) {
    super();
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
      this.props.navigation.navigate('PodsHome', {username: this.state.username})
      console.log(this.state.username)
    }
  }

  render() {
    //return(<AppLoading></AppLoading>)

      return (
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={{flex: 1,  backgroundColor:"white"}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={(windowHeight / 20)}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={[styles.contentContainer, {padding: windowWidth / 10}]}>

                {/* Titles */}
                <View style={styles.titleContainer}>
                  <Image
                    source={require('./assets/images/sapling-icon.png')}/>
                  <Text style={styles.header1}>Welcome to Sapling!</Text>
                  <Text style={[styles.subtitle, {textAlign: 'center'}]}>A growth-oriented social computing system</Text>
                </View>

                {/* Login Prompt */}
                {/*<Text style={[styles.inputLabel, {alignSelf: 'flex-start'}]}>Please enter your username</Text>*/}
                <TextInput
                  style={[styles.textInput, {width: '100%'}]}
                  placeholder = 'Username'
                  autoCapitalize='none'
                  multiline={false}
                  onSubmitEditing = {() => Keyboard.dismiss()}
                  onChangeText = {(text) => this.setState({username: text})}
                />

                <TouchableOpacity
                  style={[styles.button, {width: '100%'}]}
                  onPress={() => this.handleSubmit()}>
                    <Text style={styles.buttonLabel}>Log In</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      )
  }
}

export {Login}
