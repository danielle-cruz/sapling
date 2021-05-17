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

/* Image and Date Time Picker */
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


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
      accomplished_date: new Date(),
      show_date: false,
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
  async uploadPost() {
     if (this.state.pod_name === '') {
      Alert.alert('Please select a pod.')
    }

    console.log('uploaded');
    databaseFunctions.makePost(
      {
        title: this.state.title,
        text: this.state.text,
        accomplished_date: this.state.accomplished_date,
        username: this.state.username,
        pod_name: this.state.pod_name,
        media_file: this.state.media,
        media_type: this.state.type,
      }
    );


    // NEED TO ADD DATE AND PODNAME

  }

  handleDatePicker() {
    this.setState({
      show_date: true
    })
  }

  handleDate(event, selectedDate) {
    const currentDate = selectedDate;
    console.log("current date", currentDate)
    this.setState({
      show_date: Platform.OS === 'ios',
      accomplished_date: currentDate
    })

    console.log("current date", this.state.accomplished_date)

  }

  render() {
    console.log('\nCURRENT STATES')
    console.log("title: ", this.state.title)
    console.log("text: ",this.state.text)
    console.log("media: ",this.state.media)
    console.log("type: ",this.state.type)
    console.log("pood: ",this.state.pod_name)
    console.log("date: ",this.state.accomplished_date)
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
              style={[styles.button, {width: '100%'}]}
              onPress={() => this.handleDatePicker()}>
              <Text style={styles.buttonLabel}>Select date accomplished</Text>
            </TouchableOpacity>

            { this.state.show_date ?
              <DateTimePicker
              style={{width: 320, backgroundColor: "white"}}

                  testID="dateTimePicker"
                  value={this.state.accomplished_date}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    console.log('entered')
                    this.handleDate(event, selectedDate)}}
                />

                :
                <View><Text>Sad</Text></View>

            }


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
