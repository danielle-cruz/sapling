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
import {SinglePost} from './SinglePost.js'

export default class Example extends React.Component {

  constructor({route, navigation}){
    super({route, navigation});
    this.state = {
      tree_health: Object.keys(IMAGES).length - 1
    }
  }

  renderLeaf(orientation){
    if(orientation == 'left'){
      if(this.state.tree_health >= 5) {
          return  <Image style={{position:'absolute', marginTop:50,}}source = {require('./assets/full_tree/full_left_leaf.png')}/>
      }else if(this.state.tree_health >= 3){
          return <Image style={{position:'absolute', marginTop:50, marginLeft:0}}source = {require('./assets/good_tree/good_left_leaf.png')}/>
      } else if(this.state.tree_health >= 1){
          return  <Image style={{position:'absolute', marginTop:50, marginLeft:0}}source = {require('./assets/fair_tree/fair_left_leaf.png')}/>
      }
          return <Image style={{position:'absolute', marginTop:50, marginLeft:0}}source = {require('./assets/poor_tree/poor_left_leaf.png')}/>
    }
    if(orientation == 'right'){
      if(this.state.tree_health >= 5) {
          return  <Image style={{position:'absolute', marginTop:50,}}source = {require('./assets/full_tree/full_right_leaf.png')}/>
      }else if(this.state.tree_health >=3){
          return <Image style={{position:'absolute', marginTop:50, marginLeft:0}}source = {require('./assets/good_tree/good_right_leaf.png')}/>
      } else if(this.state.tree_health >= 1){
          return  <Image style={{position:'absolute', marginTop:50, marginLeft:0}}source = {require('./assets/fair_tree/fair_right_leaf.png')}/>
      }
          return <Image style={{position:'absolute', marginTop:50, marginLeft:0}}source = {require('./assets/poor_tree/poor_right_leaf.png')}/>
    }

  }


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
            datePosted:  value.datePosted.toDateString().slice(4,10)
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
                    <Image style={{width:10, height:10, marginTop:1.5}}source = {require('./assets/defaults/profile.png')}/>
                    <Text style={{fontSize:10, marginLeft:3}}>{curImage.poster}</Text>
                  </View>
                  <Text style={{fontSize:10, alignSelf:'flex-end'}}>{curImage.datePosted}</Text>
                </View>
              {/** Leaf node stem, pic, and shadow*/}
              {this.renderLeaf('left')}
                <View style={{shadowColor:'#000', shadowOpacity:0.3, shadowOffset: {width: 3, height:3}, shadowRadius:2,}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SinglePost', {image: curImage})}> 
                <Image style={{width:125, height:150, marginLeft:3, marginTop:0, borderRadius:10,}}source = {curImage.link}/>
                </TouchableOpacity>
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
                    <Image style={{width:10, height:10, marginTop:1.5}}source = {require('./assets/defaults/profile.png')}/>
                    <Text style={{fontSize:10, marginLeft:3}}>{curImage.poster}</Text>
                  </View>
                  <Text style={{fontSize:10, alignSelf:'flex-end'}}>{curImage.datePosted}</Text>
                </View>
              {/** Leaf node stem, pic, and shadow*/}
              {this.renderLeaf('right')}
                <View style={{shadowColor:'#000', shadowOpacity:0.3, shadowOffset: {width: 3, height:3}, shadowRadius:2,}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('SinglePost', {image: curImage})}> 
                <Image style={{width:125, height:150, marginLeft:70, marginTop:0, borderRadius:10,}}source = {curImage.link}/>
                </TouchableOpacity>
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


      {this.state.tree_health >= 5 ?
           <View>
           <Image style={{alignSelf:'center', marginTop: 30, width: 350, height:350}} source = {require('./assets/full_tree/full_tree_top.png')}></Image>
           <ImageBackground  resizeMode="stretch" style={{alignSelf:'center', marginLeft: 30, marginRight: 30, width: 350, height:'100%'}} source = {require('./assets/full_tree/full_tree_trunk.png')}>
           {imageViews}
           </ImageBackground>
           </View>

           :
      this.state.tree_health >= 3 ?
            <View>
            <Image style={{alignSelf:'center', marginTop: 30, width: 350, height:350}} source = {require('./assets/good_tree/good_tree_top.png')}></Image>
            <ImageBackground  resizeMode="stretch" style={{alignSelf:'center', marginLeft: 30, marginRight: 30, width: 350, height:'100%'}} source = {require('./assets/good_tree/good_tree_trunk.png')}>
            {imageViews}
            </ImageBackground>
            </View>
           :
      this.state.tree_health >= 1 ?
            <View>
            <Image style={{alignSelf:'center', marginTop: 30, width: 350, height:350}} source = {require('./assets/fair_tree/fair_tree_top.png')}></Image>
            <ImageBackground  resizeMode="stretch" style={{alignSelf:'center', marginLeft: 30, marginRight: 30, width: 350, height:'100%'}} source = {require('./assets/fair_tree/fair_tree_trunk.png')}>
            {imageViews}
            </ImageBackground>
            </View>
           :
            <View>
            <Image style={{alignSelf:'center', marginTop: 30, width: 350, height:350}} source = {require('./assets/poor_tree/poor_tree_top.png')}></Image>
            <ImageBackground  resizeMode="stretch" style={{alignSelf:'center', marginLeft: 30, marginRight: 30, width: 350, height:'100%'}} source = {require('./assets/poor_tree/poor_tree_trunk.png')}>
            {imageViews}
            </ImageBackground>
            </View>
  }
      </ScrollView>
    </SafeAreaView>
    )
  }
}

export {Example}
