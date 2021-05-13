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
    ImageBackground,
    TextInput,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Assets, createStackNavigator } from '@react-navigation/stack';
import { IMAGES } from './IMAGES.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './Styles.js';

/* Dimensions */
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default class SinglePost extends React.Component {

  constructor({route, navigation}){
    super();
    this.state = {
      curImage: route.params.image,
      liked: false,
      username: route.params.username
    }
  }

  toggleLike = () =>{
    let prevState = this.state.liked;
    this.setState({liked:!prevState});
  }

  renderComments = () => {
    let commentViews = []
    for (let [key,value] of Object.entries(this.state.curImage.comments)) {
      commentViews.unshift(
        <View style={{flexDirection:"column", marginBottom: 30}}>
        <View style={{flexDirection:"row", marginBottom: 10, marginRight:4, justifyContent:'space-between'}}>
        <Text style={{fontWeight: '600', }}>{value.username}</Text> 
        <Text style={{marginLeft:10, fontSize:10, marginTop:3}}>{value.comment_date.toDateString().slice(4,10)}</Text> 
        </View>
        <Text style={{}}>{value.text}</Text>
        </View>
  );
    }
    return commentViews
  }

  handleSubmit = () => {
    Keyboard.dismiss();
    let newComment = {};
    newComment.text = this.state.curComment;
    newComment.username = this.state.username;
    newComment.likes = 0;
    newComment.reported= false;
    newComment.post_id= "post_id";
    newComment.comment_date= new Date();
    this.state.curImage.comments.push(newComment)
    this.setState({curImage: this.state.curImage, curComment:""})
  }

  render() {
    let commentViews = this.renderComments()
    return (
      <SafeAreaView style={{width:'100%'}}>
      <ScrollView keyboardShouldPersistTaps='handled'>
           <View style={{marginTop:30}}>
           <View style={{width: 350, flexDirection:'row', justifyContent:'space-between', margin:5, alignSelf:'center'}}>
                  <View style={{alignSelf:'flex-start', flexDirection:'row'}}>
                    <Image style={{width:16, height:16, marginTop:2, marginRight:2}}source = {require('./assets/defaults/profile.png')}/>
                    <Text style={{fontSize:16, marginLeft:5}}>{this.state.curImage.poster}</Text>
                  </View>
                  <Text style={{fontSize:16, alignSelf:'flex-end'}}>{this.state.curImage.datePosted}</Text>
                </View>
           <Image style={{alignSelf:'center', marginTop: 5, width: 350, height:350}} source = {this.state.curImage.link}></Image>
           <View style={{width: 350, flexDirection:'row', justifyContent:'space-between', marginBottom:15, alignSelf:'center'}}>
                  <View style={{alignSelf:'flex-start', flexDirection:'row'}}>
                  {this.state.liked?
              <Icon
                name='heart'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 32, marginTop:10, alignSelf:'flex-end'}}
                onPress={this.toggleLike}
              /> 
              :
              <Icon
                name='heart-outline'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 32, marginTop:10, alignSelf:'flex-end'}}
                onPress={this.toggleLike}
              /> 
             }
              <TextInput
                  style={[styles.commentTextInput, { height:50, width: 240, marginRight:10}]}
                  placeholder = 'Write a comment...'
                  autoCapitalize='none'
                  multiline={false}
                  value={this.state.curComment}
                  onSubmitEditing = {() => Keyboard.dismiss()}
                  onChangeText = {(text) => this.setState({curComment: text})}
                />
                <TouchableOpacity
                  style={styles.commentPostButton}
                  onPress={() => this.handleSubmit()}>
                    <Text style={styles.commentPostButtonLabel}>Submit</Text>
                </TouchableOpacity>
                  </View>
                </View>
              <View style={{flexDirection:'column', width: 350, margin:5, alignSelf:'center'}}>
              <View style={{width: 350, flexDirection:'row', justifyContent:'space-between', margin:5, alignSelf:'center'}}>
              </View>
              {commentViews}
            </View>
           </View>
      </ScrollView>
    </SafeAreaView>
    )
  }
}

export {SinglePost}
