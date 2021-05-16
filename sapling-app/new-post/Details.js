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
import { styles } from '../Styles.js';

/* Image Picker */
import * as ImagePicker from 'expo-image-picker';

/* Database Endpoinst */
let databaseFunctions = require('../database-endpoints.js');




// GET USERNAME, TITLE, TEXT, IMAGE


export default class Details extends React.Component {
  constructor({navigation, route}) {
    super();
    this.state = {
      username: route.params.username,
      title: route.params.title,
      text: route.params.text,
      image: route.params.image,
    }
  }

  useEffect() {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  }

  /*
  * Stores a new post in the database. Returns Promise of the id of the post.
  *
  * Takes an object (dictionary) as input. Expected fields:
  * title: string
  * text: string
  * accomplished_date: timestamp  (this is NOT necessarily the date posted)
  * username: string
  * pod_name: string
  * media_file: File or Blob
  */
  uploadPost() {
    console.log('uploaded');
    console.log(this.state.image);
    databaseFunctions.makePost(
      {
        title: this.state.title,
        text: this.state.text,
        accomplished_date: Date.now(),
        username: this.state.username,
        pod_name: 'example_pod_name',
        media_file: this.state.image
      }
    );
    // NEED TO ADD DATE AND PODNAME

  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{flex: 1,  backgroundColor:"white"}}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={(windowHeight / 20)}>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.contentContainer, {padding: windowWidth / 10, paddingTop: 0}]}>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export {Details}
