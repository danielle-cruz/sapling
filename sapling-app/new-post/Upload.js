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


export default class Upload extends React.Component {
  constructor({navigation, route}) {
    super();
    this.state = {
      username: route.params.username,
      title: '',
      text: '',
      image: null,
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

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{flex: 1,  backgroundColor:"white"}}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={(windowHeight / 20)}>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Text>Start of the New Post Flow</Text>
              {/* Post Title */}
              <TextInput
                style={[styles.textInput, {width: '100%'}]}
                placeholder = 'Title...'
                multiline={false}
                onSubmitEditing = {() => Keyboard.dismiss()}
                onChangeText = {(text) => this.setState({title: text})}
              />
              {/* Upload photo or video from camera roll */}
              <TouchableOpacity
                style={[styles.button, {width: '100%'}]}
                onPress={() => this.pickImage()}>
                <Text>Pick an image from camera roll</Text>
                {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
              </TouchableOpacity>
              {/* Post text / reflection */}
              <TextInput
                style={[styles.textInput, {width: '100%'}]}
                placeholder = 'Add a reflection...'
                multiline={false}
                onSubmitEditing = {() => Keyboard.dismiss()}
                onChangeText = {(text) => this.setState({title: text})}
              />
              {/*<TouchableOpacity
                  onPress={() => this.props.navigation.navigate('PodsHome')}>
                  <Text>Press to go to Pods</Text>
              </TouchableOpacity>*/}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export {Upload}
