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

const IMAGES = {
  iceCream: {
    id: 'iceCream',
    poster: 'Dani',
    pod1: true,
    pod2: false,
    link: require('./assets/ice_cream.jpg'),
    likes: Math.floor(Math.random() * Math.floor(300)),
    comments: Math.floor(Math.random() * Math.floor(25)),
    datePosted: 'May 12',
  },

  cake: {
    id: 'cake',
    poster: 'Gianna',
    pod1: true,
    pod2: false,
    link: require('./assets/cake.jpg'),
    likes: Math.floor(Math.random() * Math.floor(300)),
    comments: Math.floor(Math.random() * Math.floor(25)),
    datePosted: 'May 10',
  },

  sydney: {
    id: 'sydney',
    poster: 'Sydney',
    pod1: true,
    pod2: false,
    link: require('./assets/sydney.jpg'),
    likes: Math.floor(Math.random() * Math.floor(300)),
    comments: Math.floor(Math.random() * Math.floor(25)),
    datePosted: 'May 9',
  },
}
export default class Example extends React.Component {

  renderLeafNodes(){
    let images = [];
    for (const [key, value] of Object.entries(IMAGES)) {
      if (value.pod1 === true) {
        images.push(
          {
            id: value.id,
            poster:  value.poster,
            pod1:  value.pod1,
            pod2: value.pod2,
            link:  value.link,
            likes:  value.likes,
            comments:  value.comments,
            datePosted:  value.datePosted
          }
        );
      }
    }
     // Sort images by date in feed
    images.sort(function(a, b) {
      return b.datePosted - a.datePosted;
    });

    let imageViews = [];
    for(let i = 0; i < images.length; i++){
      let curImage = images[i];
        if(i % 2 == 0){
          imageViews.push(
            /** left leaf node*/
            <View key = {curImage.id} style={{ alignSelf:'flex-start',marginLeft:5, marginBottom:30}}>
              {/** Username of Poster and Date*/}
                <View style={{flexDirection:'row', justifyContent:'space-between', margin:5}}>
                  <View style={{alignSelf:'flex-start', flexDirection:'row'}}>
                    <Image style={{width:10, height:10, marginTop:1.5}}source = {require('./assets/profile.png')}/>
                    <Text style={{fontSize:10, marginLeft:3}}>{curImage.poster}</Text>
                  </View>
                  <Text style={{fontSize:10, alignSelf:'flex-end'}}>{curImage.datePosted}</Text>
                </View>
              {/** Leaf node stem, pic, and shadow*/}
                <Image style={{position:'absolute', marginTop:50, marginLeft:0}}source = {require('./assets/left_leaf.png')}/>
                <View style={{shadowColor:'#000', shadowOpacity:0.3, shadowOffset: {width: 3, height:3}, shadowRadius:2,}}>
                <Image style={{width:125, height:150, marginLeft:3, marginTop:0, borderRadius:10,}}source = {curImage.link}/>
                </View>
            </View>
          );
        } else {
          imageViews.push(
            /** right leaf node*/
            <View key = {curImage.id} style={{ alignSelf:'flex-end',marginRight:15, marginBottom:30}}>
              {/** Username of Poster and Date*/}
                <View style={{flexDirection:'row', justifyContent:'space-between', margin:5}}>
                  <View style={{alignSelf:'flex-start', marginLeft:65, flexDirection:'row'}}>
                    <Image style={{width:10, height:10, marginTop:1.5}}source = {require('./assets/profile.png')}/>
                    <Text style={{fontSize:10, marginLeft:3}}>{curImage.poster}</Text>
                  </View>
                  <Text style={{fontSize:10, alignSelf:'flex-end'}}>{curImage.datePosted}</Text>
                </View>
              {/** Leaf node stem, pic, and shadow*/}
                <Image style={{position:'absolute', marginTop:50,}}source = {require('./assets/right_leaf.png')}/>
                <View style={{shadowColor:'#000', shadowOpacity:0.3, shadowOffset: {width: 3, height:3}, shadowRadius:2,}}>
                <Image style={{width:125, height:150, marginLeft:70, marginTop:0, borderRadius:10,}}source = {curImage.link}/>
                </View>
            </View>
          );
        }
    }
    return imageViews;
  }

  render() {
    
    let imageViews = this.renderLeafNodes();
    return (
      <SafeAreaView style={{width:'100%'}}>
      <ScrollView >
      <ImageBackground  style={{alignSelf:'center', margin: 30, width: 350, height:1500}} source={require('./assets/full_tree.png')}>
        {/** Empty view to leave space for tree top*/}
        <View style={{height:300}}/>
        {imageViews}
      </ImageBackground>
      </ScrollView>
    </SafeAreaView>
    )
  }
}

export {Example}
