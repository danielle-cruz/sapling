import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Alert,
    Image,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    WebView,
    ScrollView,
    SafeAreaView,
    ImageBackground
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Assets, createStackNavigator } from '@react-navigation/stack';
import { IMAGES } from './IMAGES.js'

export default class SinglePost extends React.Component {

  constructor({route, navigation}){
    super({route, navigation});
    this.state = {
      curImage: route.params.image
    }
  }

  render() {
    return (
      <SafeAreaView style={{width:'100%'}}>
      <ScrollView>
           <View>
           <Image style={{alignSelf:'center', marginTop: 30, width: 350, height:350}} source = {this.state.curImage.link}></Image>
           </View>
      </ScrollView>
    </SafeAreaView>
    )
  }
}

export {SinglePost}
