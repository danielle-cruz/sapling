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

export default class HeaderBar extends React.Component {

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts).then(() => this.setState({ fontsLoaded: true }))
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {

    return (
      <View style={[styles.headerBar, {height: windowHeight / 8}]}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/icons/sapling-icon.png')}
            style={[styles.icons, {resizeMode: 'contain', marginRight: 10, }]}/>
          <Text style={[styles.header1, {marginTop:5.5}]}>{this.props.username}</Text>
        </View>
        <View style={styles.barIcons}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Upload', {username: this.props.username})}>
            <Image
              source={require('../../assets/icons/upload-icon.png')}
              style={styles.icons}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export {HeaderBar}
