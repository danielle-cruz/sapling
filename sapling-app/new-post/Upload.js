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



export default class Upload extends React.Component {
  constructor({navigation, route}) {
    super();
    this.state = {
      username: route.params.username,
      title: '',
      text: '',
      image: null,
      saveImage: ''
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
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri , saveImage: `data:image/jpeg;base64,${result}` })
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
    console.log('uploaded');


    databaseFunctions.makePost(
      {
        title: this.state.title,
        text: this.state.text,
        accomplished_date: new Date(),
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
            <View style={[styles.contentContainer, {padding: windowWidth / 10}]}>
              {/* Post Title */}
              <TextInput
                style={[styles.postTitleInput, {width: '100%'}]}
                placeholder = 'Title...'
                multiline={false}
                onSubmitEditing = {() => Keyboard.dismiss()}
                onChangeText = {(text) => this.setState({title: text})}
              />
              {/* Upload photo or video from camera roll */}
              <TouchableOpacity
                style={[styles.uploadImageButton, {width: '80%', height: undefined, aspectRatio: 1}]}
                onPress={() => this.pickImage()}>
                {!this.state.image ?
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Image
                        style={{width: '20%', height: undefined, aspectRatio: 1, margin: 10, resizeMode: 'contain'}}
                        source={require('../assets/icons/camera-icon.png')}/>
                      <Text style={styles.subtitle}>Upload a photo or video</Text>
                    </View>
                  :
                    <Image source={{ uri: this.state.image }} style={{ width: '100%', height: undefined, aspectRatio: 1, resizeMode: 'cover'}}/>
                }
              </TouchableOpacity>
              {/* Post text / reflection */}
              <TextInput
                style={[styles.postTextInput, {width: '100%', height: '20%%'}]}
                placeholder = 'Add a reflection...'
                multiline={true}
                maxHeight={'25%'}
                maxLength={400}
                onSubmitEditing = {() => Keyboard.dismiss()}
                onChangeText = {(text) => this.setState({text: text})}
              />

              <TouchableOpacity
                style={[styles.button, {width: '100%'}]}
                onPress={() => this.uploadPost()}>
                <Text style={styles.buttonLabel}>Next</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export {Upload}
