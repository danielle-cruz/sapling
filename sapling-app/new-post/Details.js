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
      title: route.params.post_title,
      text: route.params.post_text,
      media: route.params.post_media,
      type: route.params.post_type,
      pod_name: ''
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
    try {
      databaseFunctions.makePost(
        {
          title: this.state.title,
          text: this.state.text,
          accomplished_date: Date.now(),
          username: this.state.username,
          pod_name: this.state.pod_name,
          media_file: this.state.image
        }
      );
    } catch(error) {
      console.log("Error", error);
    }


    // NEED TO ADD DATE AND PODNAME

  }

  render() {
    console.log('we reached the details page!')
    console.log(this.state.title)
    console.log(this.state.text)
    console.log(this.state.media)
    console.log(this.state.type)
    console.log(this.state.pod_name)
    console.log('====')


    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{flex: 1,  backgroundColor:"white"}}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={(windowHeight / 20)}>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={[styles.contentContainer, {padding: windowWidth / 10, flexGrow: 1, flexShrink: 1}]}>
            <View style={[styles.previewBox, {width: windowWidth}]}>
              <Image source={{ uri: this.state.media }} style={styles.previewImage}/>
              <View style={{maxWidth: '70%'}}>
                <Text style={styles.header1}>{this.state.title}</Text>
                <Text
                  numberOfLines={2}
                  style={styles.text}>
                  {this.state.text}
              </Text>
              </View>
            </View>

              <TouchableOpacity
                style={this.state.pod_name === 'dance' ? [styles.button, {width: '100%'}] : [styles.unselectedButton, {width: '100%'}]}
                onPress={() => this.setState({pod_name: 'dance'})}>
                <Text style={this.state.pod_name === 'dance' ? styles.buttonLabel : styles.unselectedButtonLabel }>Dance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={this.state.pod_name === 'spanish' ? [styles.button, {width: '100%'}] : [styles.unselectedButton, {width: '100%'}]}
                onPress={() => this.setState({pod_name: 'spanish'})}>
                <Text style={this.state.pod_name === 'spanish' ? styles.buttonLabel : styles.unselectedButtonLabel }>Spanish</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, {width: '100%'}]}
                onPress={() => this.uploadPost()}>
                <Text style={styles.buttonLabel}>Upload</Text>
              </TouchableOpacity>
            </View>

          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export {Details}
