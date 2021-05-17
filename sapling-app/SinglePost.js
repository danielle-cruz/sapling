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
    this.setState({postLikes: this.state.curImage.likes});
    let likedPosts = this.state.user.liked_posts;
      if(likedPosts.includes(this.state.postID)){
        this.setState({liked: true});
      }
 }


  fetchPostComments(){
    let posts = databaseFunctions.getComments(this.state.postID);
    posts.then((result) => {
      this.setState({commentsList: result}, () => {this.fetchUser()});
      console.log("fetched Post Comments");
      return;
    }).catch((error) => {
      console.log("Error", error);
     })
   }

   fetchUser(){
    let posts = databaseFunctions.getUser(this.state.username);
    posts.then((result) => {
      console.log("fetched User");
      this.setState({user: result}, () => {this.setLikedComments(); this.setLikedPost()});
      return;
    }).catch((error) => {
      console.log("Error", error);
     });
   }

  toggleLikePost = () =>{
    let prevState = this.state.liked;
    console.log("LikedPost, post_id = ", this.state.postID, "user_id = ", this.state.user.user_id);
    this.setState({liked:!prevState});
    let likes = databaseFunctions.likePost(this.state.postID, this.state.user.user_id);
    likes.then((result) => {
      console.log('likes: ', result);
      this.setState({postLikes: result});
    }).catch((error) => {
      console.log("Error", error);
    });
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
        { text: "Yes", onPress: () => {console.log("flaged Post, id =", this.state.postID); databaseFunctions.reportPost(this.state.postID); setTimeout(() => this.props.navigation.navigate("Example", {refresh: "true"}, 500))}, style: "destructive" }
      ]
    );
  }

  toggleLikeComment = (commentID) => {
    databaseFunctions.likeComment(commentID, this.state.user.user_id);
    console.log("likeComment");
    let prevState = this.state[commentID];
    this.setState({[commentID]:!prevState}, () => setTimeout(() => this.fetchPostComments(), 10));
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
        { text: "Yes", onPress: () => {console.log("flagged Comment, id = ", commentID); databaseFunctions.reportComment(commentID); this.fetchPostComments()}, style: "destructive" }
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
        <Text style={{marginLeft:10, fontSize:12, marginTop:12, marginRight:10}}>{value.comment_date.toDate().toDateString().slice(4,10)}</Text> 
        <Text style={{marginLeft:10, fontSize:12, marginTop:11, marginRight:5}}>{value.likes}</Text> 
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
                style = {{fontSize: 20, marginTop:10, marginRight:5, alignSelf:'flex-end'}}
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
      this.setState({curComment:""}, () => setTimeout(() => this.fetchPostComments(), 500));
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
             <View style={{width:350, alignSelf:'center'}}>
           <View style={{width: 350, maxHeight:900, flexDirection:'row', justifyContent:'space-between', margin:5, alignSelf:'center'}}>
            <View style={{ alignSelf:"center", marginTop:0, width:350, marginRight:5}}>
            <View style={{flexDirection:'row',  marginTop:5}}>
             <Image style={{width:11, height:11, marginTop:1.5}} source={require('./assets/defaults/profile.png')}></Image>
             <Text style={{fontSize:11, fontWeight:'400', marginLeft:3,}}>{this.state.curImage.poster}   {this.state.curImage.datePosted}</Text>
             </View>
             <Text style={{fontSize: 24, fontWeight:'400', marginTop:5}}>{this.state.curImage.title}</Text>
              </View>
              </View>
             <Text style={{fontSize: 16, fontWeight:'300', marginBottom:5}}>{this.state.curImage.text}</Text>
             </View>
           <Image style={{alignSelf:'center', marginTop: 5, width: 350, height:350}} source={{uri: this.state.curImage.link}}></Image>
           <View style={{width: 350, flexDirection:'row', justifyContent:'space-between', marginBottom:15, alignSelf:'center'}}>
                  <View style={{alignSelf:'flex-start', flexDirection:'row'}}>
                  <Text style={{fontSize:22, marginTop:21, marginRight:5}}>{this.state.postLikes}</Text> 
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
                  style={[styles.commentTextInput, { height:50, width: 195, marginRight:10}]}
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
