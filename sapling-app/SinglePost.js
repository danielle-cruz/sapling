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
    KeyboardAvoidingView,
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
   }

   setLikedComments = () => {
      let likedComments = this.state.user.liked_comments;
      for (let [key,value] of Object.entries(this.state.commentsList)) {
        if(likedComments.includes(value.id)){
          this.setState({[`${value.id}`]: true});
        } else {
            this.setState({[`${value.id}`]: false});
        }
      }
   }

   setLikedPost = () => {
     //console.log("this.state.user", this.state.user, this.state.user.liked_posts)
    let likedPosts = this.state.user.liked_posts;
      if(likedPosts.includes(this.state.postID)){
        this.setState({liked: true});
      }
 }


  fetchPostComments(){
    let posts = databaseFunctions.getComments(this.state.postID);
    posts.then((result) => {
      this.setState({commentsList: result}, () => {this.fetchUser()});
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
      this.setState({user: result}, () => {this.setLikedComments(); this.setLikedPost()});
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
    this.setState({flagged:!prevState});
    Alert.alert(
      "Confirm Report Post",
      "Clicking yes will remove this post for review by system admins",
      [
        {
          text: "No",
          onPress: () => console.log("FlagPostCancelled"),
        },
        { text: "Yes", onPress: () => {console.log("toggleFlagPost()", this.state.postID); databaseFunctions.reportPost(this.state.postID); this.props.navigation.navigate("Example", {refresh: "true"})}, style: "destructive" }
      ]
    );
  }

  toggleLikeComment = (commentID) => {
    databaseFunctions.likeComment(commentID, this.state.user.user_id);
    console.log("likeComment");
    let prevState = this.state[commentID];
    this.setState({[commentID]:!prevState});
  }

  toggleFlagComment = (commentID) => {
    Alert.alert(
      "Confirm Report Comment",
      "Clicking yes will remove this comment for review by system admins",
      [
        {
          text: "No",
          onPress: () => console.log("FlagCommentCancelled"),
        },
        { text: "Yes", onPress: () => {console.log("toggleFlagComment", commentID); databaseFunctions.reportComment(commentID); this.fetchPostComments()}, style: "destructive" }
      ]
    );
    return;
  }

renderComments = () => {
    let commentViews = [];
    if(this.state.commentsList == null) return;
    for (let [key,value] of Object.entries(this.state.commentsList)) {
      let commentID = value.id;
      commentViews.unshift(
        <View style={{flexDirection:"column", marginBottom: 30}}>
        <View style={{flexDirection:"row", marginBottom: 10, marginRight:4, alignItems: 'center', justifyContent:'space-between'}}>
        <Text style={{fontWeight: '600', }}>{value.username}</Text> 
        <View style={{flexDirection:"row", marginBottom: 10, marginRight:4, alignItems: 'center', justifyContent:'space-between'}}>
        <Text style={{marginLeft:10, fontSize:10, marginTop:11, marginRight:10}}>{value.comment_date.toDate().toDateString().slice(4,10)}</Text> 
        {this.state[commentID]?
              <Icon
                name='heart'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{fontSize: 20, marginTop:10, marginRight:5, alignSelf:'flex-end'}}
                onPress={() => this.toggleLikeComment(value.id)}
              />
              :
              <Icon
                name='heart-outline'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 20, marginTop:10, marginRight:5, alignSelf:'flex-end'}}
                onPress={() => this.toggleLikeComment(value.id)}
              /> 
        }
              <Icon
                name='flag-outline'
                type='MaterialCommunityIcons'
                color='#A3B92B'
                style = {{ fontSize: 20, marginTop:10, alignSelf:'flex-end'}}
                onPress={() => this.toggleFlagComment(value.id)}
              /> 
        </View>
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
      this.setState({curComment:""}, () => this.fetchPostComments());
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
            <View style={{ alignSelf:"center", marginTop:0, width:295, marginRight:5}}>
             <Text style={{fontSize: 18, fontWeight:'500', marginTop:3}}>{this.state.curImage.title}</Text>
             <Text style={{fontSize: 16, fontWeight:'300', marginTop:5}}>{this.state.curImage.text}sfgsfd asdfasdfas ss</Text>
             </View>
             <View>
              <Text style={{fontSize:10, marginLeft:0, marginTop:15}}>{this.state.curImage.poster}</Text>
              <Text style={{fontSize:12, marginTop:5}}>{this.state.curImage.datePosted}</Text>
              </View>
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
