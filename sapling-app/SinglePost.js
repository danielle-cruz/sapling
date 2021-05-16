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
let databaseFunctions = require('./database-endpoints.js');

/* Dimensions */
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SinglePost extends React.Component {

  constructor({route, navigation}){
    super();
    this.state = {
      curImage: route.params.image,
      postID: route.params.postID,
      liked: false,
      flagged: false,
      username: route.params.username,
    }
   
  }
  
   componentDidMount= () =>{
    this.fetchPostComments();
    this.fetchUser();
   }


  fetchPostComments(){
    let posts = databaseFunctions.getComments(this.state.postID);
    posts.then((result) => {
      this.setState({commentsList: result});
      console.log("fetchPostComments");
      return;
    }).catch((error) => {
      console.log("Error", error);
     })
   }

   fetchUser(){
    let posts = databaseFunctions.getUser(this.state.username);
    posts.then((result) => {
      console.log("fetchUser()");
      this.setState({user: result});
      return;
    }).catch((error) => {
      console.log("Error", error);
     });
   }

  toggleLikePost = () =>{
    let prevState = this.state.liked;
    console.log("toggleLikePost()", this.state.postID, this.state.user.user_id);
    this.setState({liked:!prevState});
    databaseFunctions.likePost(this.state.postID, this.state.user.user_id);
  }

  toggleFlagPost = () =>{
    let prevState = this.state.flagged;
    console.log("toggleFlagPost() ", this.state.postID);
    this.setState({flagged:!prevState});
    databaseFunctions.reportPost(this.state.postID);
  }

  toggleLikeComment = (commentID) => {
    let prevState = this.state.liked;
    //this.setState({liked:!prevState});
    console.log("likeComment");
    databaseFunctions.likeComment(commentID, this.state.user.user_id);
  }

  toggleFlagComment = (commentID) =>{
    console.log("flagComment, ", commentID);
    //this.setState({flagged:!prevState});
    //databaseFunctions.reportComment(commentID);
    return;
  }

renderComments = () => {
    let commentViews = [];
    if(this.state.commentsList == null) return;
    for (let [key,value] of Object.entries(this.state.commentsList)) {
      commentViews.unshift(
        <View style={{flexDirection:"column", marginBottom: 30}}>
        <View style={{flexDirection:"row", marginBottom: 10, marginRight:4, justifyContent:'space-between'}}>
        <Text style={{fontWeight: '600', }}>{value.username}</Text> 
        <Text style={{marginLeft:10, fontSize:10, marginTop:3}}>{value.comment_date.toDate().toDateString().slice(4,10)}</Text> 
       {console.log(value.comment_id)}
        {/** 
        {this.state.user.liked_comments.length != 0 && this.state.user.liked_comments.includes(value.comment_id)?
          
              <Icon
                name='heart'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 32, marginTop:10, alignSelf:'flex-end'}}
                onPress={this.toggleLikeComment(value.comment_id)}
              /> 
              
              :
              <Icon
                name='heart-outline'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 32, marginTop:10, alignSelf:'flex-end'}}
                onPress={this.toggleLikeComment(value.comment_id)}
              /> 
        }
        */}
              <Icon
                name='flag-outline'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 32, marginTop:10, alignSelf:'flex-end'}}
                onPress={this.toggleFlagComment(value.comment_id)}
              /> 
        </View>
        <Text style={{}}>{value.text}</Text>
        </View>
        
  );
    }
    return commentViews;
  }

  handleSubmit = () => {
    Keyboard.dismiss();
    let newComment = {};
    newComment.text = this.state.curComment;
    newComment.username = this.state.username;
    newComment.post_id= this.state.postID;
    let newCommentID = databaseFunctions.makeComment(newComment);
    newCommentID.then((result) => {
      console.log("madeComment, id = ", result);
      this.setState({curComment:""});
      this.fetchPostComments();
      this.setState({ state: this.state });
      return;
    }).catch((error) => {
      console.log("Error", error);
    })
  }

  render() {
    let commentViews = this.renderComments();
    return (
      <SafeAreaView style={{width:'100%'}}>
      <ScrollView keyboardShouldPersistTaps='handled'>
           <View style={{marginTop:30}}>
           <View style={{width: 350, maxHeight:900, flexDirection:'row', justifyContent:'space-between', margin:5, alignSelf:'center'}}>
                  <View style={{alignSelf:'flex-start', flexDirection:'row'}}>
                    <Image style={{width:16, height:16, marginTop:2, marginRight:2}}source = {require('./assets/defaults/profile.png')}/>
                    <Text style={{fontSize:16, marginLeft:5}}>{this.state.curImage.poster}</Text>
                  </View>
                  <Text style={{fontSize:16, alignSelf:'flex-end'}}>{this.state.curImage.datePosted}</Text>
                </View>
           <Image style={{alignSelf:'center', marginTop: 5, width: 350, height:350}} source={{uri: this.state.curImage.link}}></Image>
           <View style={{width: 350, flexDirection:'row', justifyContent:'space-between', marginBottom:15, alignSelf:'center'}}>
                  <View style={{alignSelf:'flex-start', flexDirection:'row'}}>
                  {this.state.liked?
              <Icon
                name='heart'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 32, marginTop:10, alignSelf:'flex-end'}}
                onPress={this.toggleLikePost}
              /> 
              :
              <Icon
                name='heart-outline'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 32, marginTop:10, alignSelf:'flex-end'}}
                onPress={this.toggleLikePost}
              /> 
             }
             {this.state.flagged?
              <Icon
                name='flag'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 32, marginTop:10, alignSelf:'flex-end'}}
                onPress={this.toggleFlagPost}
              /> 
              :
              <Icon
                name='flag-outline'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 32, marginTop:10, alignSelf:'flex-end'}}
                onPress={this.toggleFlagPost}
              /> 
             }
              <TextInput
                  style={[styles.commentTextInput, { height:50, width: 205, marginRight:10}]}
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
