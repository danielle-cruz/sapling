import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Alert,
    Image,
    Linking,
    Platform,
    StyleSheet,
    Keyboard,
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
let databaseFunctions = require('./database-endpoints.js');

export default class Example extends React.Component {

  constructor({route, navigation}){
    super();
    this.state = {
      pod_name: route.params.pod_name,
      username: route.params.username,
    }
    this.calculateTreeHealth();
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

 fetchPosts(){
  let posts = databaseFunctions.getPosts(this.state.pod_name.toLowerCase());
  posts.then((result) => {
    this.setState({postsList: result})
  }).catch((error) => {
    console.log("Error", error);
   })
 }

  calculateTreeHealth = () => {
     let health = databaseFunctions.calculateTreeHealth(this.state.pod_name);
     health.then((result) => {
      this.setState({tree_health: result})
      console.log("calculate tree health = ", result);
    }).catch((error) => {
      console.log("Error", error);
     })
  }

 componentDidMount= () =>{
    this.fetchPosts();
 }

 componentDidUpdate= (prevProps) =>{
   if(prevProps !== this.props){
    console.log("new posts fetched");
    this.fetchPosts();
   }
}

  renderLeafNodes(){
    //console.log(this.state.pod_name.toLowerCase());
    if(this.state.postsList == null) return;
    let images = [];
    for (const [key,value] of Object.entries(this.state.postsList)) {
      //console.log(value.title);
        images.push(
          {
            id: key,
            title: value.title,
            text: value.text,
            accomplished_date: value.accomplished_date.toDate().toDateString().slice(4,10) +","+value.accomplished_date.toDate().toDateString().slice(10,15),
            poster: value.username,
            likes: value.likes,
            reported: value.reported,
            datePosted: value.post_date.toDate().toDateString().slice(4,10),
            pod: value.pod_name,
            link: value.media_url,
            likes:  value.likes,
            comments:  value.comment_ids,
          }
        );
    }

    let imageViews = [];
    for(let i = 0; i < images.length; i++){
      let curImage = images[i];
        if(i % 2 == 0){
          imageViews.push(
            /** left leaf node*/
            <View  key = {curImage.key} style={{ alignSelf:'flex-start',marginLeft:5, marginBottom:30}}>
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SinglePost', {image: curImage,  postID: curImage.id, username: this.state.username, pod_name: this.state.pod_name})}> 
                <Image style={{width:125, height:150, marginLeft:3, marginTop:0, borderRadius:10,}}source={{uri: curImage.link}}/>
                </TouchableOpacity>
                </View>
            </View>
          );
        } else {
          imageViews.push(
            /** right leaf node*/
            <View key = {curImage.key} style={{ alignSelf:'flex-end',marginRight:15, marginBottom:30}}>
              {/** Username of Poster and Date*/}
                <View style={{flexDirection:'row', justifyContent:'space-between', margin:5}}>
                  <View style={{alignSelf:'flex-start', marginLeft:65, flexDirection:'row'}}>
                    <Image style={{width:10, height:10, marginTop:1.5}}uri = {require('./assets/defaults/profile.png')}/>
                    <Text style={{fontSize:10, marginLeft:3}}>{curImage.poster}</Text>
                  </View>
                  <Text style={{fontSize:10, alignSelf:'flex-end'}}>{curImage.datePosted}</Text>
                </View>
              {/** Leaf node stem, pic, and shadow*/}
              {this.renderLeaf('right')}
                <View style={{shadowColor:'#000', shadowOpacity:0.3, shadowOffset: {width: 3, height:3}, shadowRadius:2,}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('SinglePost', {image: curImage, postID: curImage.id, username: this.state.username, pod_name: this.state.pod_name})}> 
                <Image style={{width:125, height:150, marginLeft:70, marginTop:0, borderRadius:10,}} source={{uri: curImage.link}}/>
                </TouchableOpacity>
                </View>
            </View>
          );
        }
    }
    return imageViews;
  }

  render() {
    console.log("render example");
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
