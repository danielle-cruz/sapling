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

/* Video Thumbnail */
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Video, AVPlaybackStatus } from 'expo-av';

/* Database Endpoinst */
let databaseFunctions = require('../database-endpoints.js');

let customFonts = {
  'RubikRegular': require('../assets/fonts/Rubik/static/Rubik-Regular.ttf'),
  'RubikBold': require('../assets/fonts/Rubik/static/Rubik-Bold.ttf'),
}


export default class Upload extends React.Component {
  constructor({navigation, route}) {
    super();
    this.state = {
      fontsLoaded: false,
      username: route.params.username,
      title: '',
      text: '',
      media: null,
      type: null,
      videoThumbnail: null,
      videoStatus: {},
      handleTitle: route.params.handleTitle,
      handleText: route.params.handleText,
      handleMedia: route.params.handleMedia,
      handleType: route.params.handleType,
      handleUsername: route.params.handleUsername,
      handleVideoThumbnail: route.params.handleVideoThumbnail
    }
    this.video = React.createRef();
    this.state.handleUsername(this.state.username);
  }

  /* Open up camera roll */
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

  /* Pick an image or video from camera roll */
  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ media: result.uri, type: result.type })
      this.state.handleMedia(result.uri)
      this.state.handleType(result.type)

      /* If a video is selected, call generateThumbnail */
      if (this.state.type === 'video') {
        this.generateThumbnail().then(() => {
          this.state.handleVideoThumbnail(this.state.videoThumbnail)
          console.log('thumbnail ', this.state.videoThumbnail)
        })
      }
    }
  }

  /* Generatee a thumbnail for uploaded videos */
  async generateThumbnail() {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(this.state.media,
        {
          time: 15000,
        }
      );
      this.setState({videoThumbnail: uri});
      console.log('thumbnail genereated!')
      console.log(this.state.videoThumbnail)
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    console.log('rendered')
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
                  onChangeText = {(title) => {
                    this.setState({title: title})
                    this.state.handleTitle(title)
                  }}
                />

                {/* Upload photo or video from camera roll */}

                {!this.state.media ?
                    <TouchableOpacity
                      style={[styles.uploadImageButton, {width: windowWidth * .70, height: undefined, aspectRatio: 1}]}
                      onPress={() => this.pickImage()}>
                      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                          style={{width: '20%', height: undefined, aspectRatio: 1, margin: 10, resizeMode: 'contain'}}
                          source={require('../assets/icons/camera-icon.png')}/>
                        <Text style={styles.subtitle}>Upload a photo or video</Text>
                      </View>
                    </TouchableOpacity>

                    :

                    this.state.type === 'video' ?
                      <View style={{width: windowWidth * .70, height: undefined, aspectRatio: 1}}>
                        <Video
                          ref={this.video}
                          style={{width: '100%', height: undefined, aspectRatio: 1}}
                          source={{
                            uri: this.state.media,
                          }}
                          useNativeControls
                          resizeMode="contain"
                          isLooping
                          onPlaybackStatusUpdate={(status) => this.setState({videoStatus: status})}
                        />
                      </View>
                      /*<Image source={{uri: this.state.videoThumbnail}} style={{ width: '100%', height: undefined, aspectRatio: 1, resizeMode: 'cover'}}/>*/
                      :
                      <Image source={{ uri: this.state.media }} style={{ width: '100%', height: undefined, aspectRatio: 1, resizeMode: 'cover'}}/>
                }
                {/* Play / Pause button*/}
                {/* this.state.type === 'video' ?
                  <View style={{width: '80%', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{position: 'absolute', bottom: windowWidth * .25, justifyContent: 'center', opacity: 0.50}}
                      onPress={() => {
                        console.log(this.state.video)
                        this.state.videoStatus.isPlaying ? this.video.current.pauseAsync() : this.video.current.playAsync()}
                      }>
                      <Image
                        style={{width: windowWidth * .25, height: undefined, aspectRatio: 1}}
                        source={this.state.videoStatus.isPlaying ? require('../assets/icons/pause-icon.png') : require('../assets/icons/play-icon.png')}/>
                    </TouchableOpacity>
                  </View> :
                  <View></View>*/
                }

                {/* Post text / reflection */}
                <TextInput
                  style={[styles.postTextInput, {width: '100%', height: '20%'}]}
                  placeholder = 'Add a reflection...'
                  multiline={true}
                  maxHeight={'25%'}
                  maxLength={400}
                  onSubmitEditing = {() => Keyboard.dismiss()}
                  onChangeText = {(text) => {
                    this.setState({text: text})
                    this.state.handleText(text)
                  }}
                />

              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      )
  }
}

export {Upload}
