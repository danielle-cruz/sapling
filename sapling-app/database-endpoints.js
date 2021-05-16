/* !!! RUN THESE COMMANDS FIRST !!!
* npm install --global yarn
* expo install firebase
* npm install uuid
* NOTE: These are ASYNCHRONOUS functions. Promises will be returned!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import firebase from 'firebase/app'
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCA9SFW7whVX-T2x0yhu2YRgVhJNbuRHpw',
  authDomain: 'sapling-grow.firebaseapp.com',
  databaseURL: 'https://sapling-grow.firebaseio.com',
  projectId: 'sapling-grow',
  storageBucket: 'sapling-grow.appspot.com'
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
const db = firebase.firestore();
const storage = firebase.storage();
const storage_ref = storage.ref();


/*
* Returns a Promise of the user object specified by the inputted username.
* User object contains user_id, username, list of liked comments (ids), and list of liked posts (ids).
* If the user doesn't exist yet, creates a new user object.
*
* In the case of several users with the same username, no guarantees are made about
* which will be returned.
*/
export async function getUser(username){
  const users = db.collection("users");
  const user = await users.where("username", "==", username).get();
  if(user.empty){
    const data = {
      username: username,
      liked_comments: [],
      liked_posts: []
    }
    let new_user_data = await users.add(data);
    data.user_id = new_user_data.id;
    return data;
  }

  let single_user;
  user.forEach(doc =>{
    single_user = doc.data();
    single_user.user_id = doc.id;
  });
  return single_user;
}


/*
* Stores a new post in the database. Returns Promise of the id of the post.
*
* Takes an object (dictionary) as input. Expected fields:
* title: string
* text: string
* accomplished_date: timestamp  (this is NOT necessarily the date posted)
* username: string
* pod_name: string
* media_file: File or Blob
* media_type: string
*/
export async function makePost(post_json) {

  const response = await fetch(post_json["media_file"])
  const blob = await response.blob();
  let filename = uuidv4();  // provide random filename
  if (post_json["media_type"] === "video") {
    filename += ".mov";
  }
  let new_media_ref = storage_ref.child(filename);
  await new_media_ref.put(blob);
  let url = await new_media_ref.getDownloadURL();

  try {
    const post = await db.collection("posts").add({
      title: post_json["title"],
      text: post_json["text"],
      comment_ids: [],
      accomplished_date: firebase.firestore.Timestamp.fromDate(post_json["accomplished_date"]),
      username: post_json["username"],
      likes: 0,
      reported: false,
      pod_name: post_json["pod_name"],
      media_url: url,
      post_date: firebase.firestore.Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.log('error')
    console.log(error)
  }

  post.post_id = post.id
  return post.id;
}


/*
* Returns a Promise containing a dictionary obj in the form:
* { post_id_1 : post_data_1, post_id_2 : post_data_2, ... }
* where post_data is another obj containing the fields described in makePost,
* plus info about number of likes, etc.
* Only non-reported posts from the inputted pod_name are returned.
* Look at the firestore database through https://console.firebase.google.com/
* for more details.
*
* The image/video is stored in the media_url field of each post. This should
* be a download url that can be used directly (as the src) within html tags.
*
* Example usage: To resolve (get the value of) the returned Promise:
*   let posts = getPosts('dance');
*   posts.then((result) => {
*     console.log("Success", result);
*     Do whatever with the result
*   }).catch((error) => {
*     console.log("Error", error);
*   })
*/
export async function getPosts(pod_name){
  const posts = await db.collection("posts").where("reported", "==", false).where("pod_name", "==", pod_name).get();
  let all_posts = {};
  posts.forEach(doc => {
    all_posts[doc.id] = doc.data();
  });
  return all_posts;
}


/*
* Stores a new comment in the database. Returns Promise of the comment id.
*
* Takes an object (dictionary) as input. Expected fields:
* text: string
* username: string
* post_id: string
*/
export async function makeComment(comment_json) {
  const comment = await db.collection("comments").add({
    text: comment_json["text"],
    username: comment_json["username"],
    likes: 0,
    reported: false,
    post_id: comment_json["post_id"],
    comment_date: firebase.firestore.Timestamp.fromDate(new Date()),
  })
  let post = db.collection("posts").doc(comment_json["post_id"]);
  post.update({comment_ids: firebase.firestore.FieldValue.arrayUnion(comment.id)});
  comment.comment_id = comment.id;
  return comment.id;
}


/*
* Returns a Promise containing a dictionary obj in the form:
* { comment_id_1 : comment_data_1, comment_id_2 : comment_data_2, ... }
* where comment_data is another obj containing the fields described in makeComment,
* plus info about number of likes, etc.
* Only non-reported comments from the inputted post_id are returned.
* Look at the firestore database through https://console.firebase.google.com/
* for more details.
*/
export async function getComments(post_id){
  const post = await db.collection("posts").doc(post_id).get();
  let comments = {};
  let comment_ids = post.data().comment_ids;
  for(var i = 0; i < comment_ids.length; i++){
    let comment_id = comment_ids[i];
    const comment_data = await db.collection("comments").doc(comment_id).get();
    if (!comment_data.data().reported) {
      comments[comment_data.id] = comment_data.data();
    }
  }
  return comments;
}


/*
* Updates database to reflect user_id clicking the like button for comment_id.
*
* If the user has not liked the comment yet, then increases the comment like count
* and updates the list of the user's liked comments to include comment_id.
* If the user has already liked the comment, then performs "unlike" action: decreases
* the comment like count and removes comment_id from the list of the user's liked comments.
*/
export async function likeComment(comment_id, user_id){
  console.log('comment_id = ', comment_id);
  let comment_doc = db.collection("comments").doc(comment_id);
  let comment = await comment_doc.get();
  console.log('comment.data() = ', comment.data);
  let curr_likes = comment.data().likes;
  let user_doc = db.collection("users").doc(user_id);
  let user = await user_doc.get();
  if (user.data().liked_comments.includes(comment_id)) {
    user_doc.update({liked_comments: firebase.firestore.FieldValue.arrayRemove(comment.id)});
    comment_doc.update({likes: curr_likes - 1})
  } else {
    user_doc.update({liked_comments: firebase.firestore.FieldValue.arrayUnion(comment.id)});
    comment_doc.update({likes: curr_likes + 1});
  }
}


/*
* Updates database to reflect user_id clicking the like button for post_id.
*
* If the user has not liked the post yet, then increases the post like count
* and updates the list of the user's liked posts to include post_id.
* If the user has already liked the post, then performs "unlike" action: decreases
* the post like count and removes post_id from the list of the user's liked posts.
*/
export async function likePost(post_id, user_id){
  let post_doc = db.collection("posts").doc(post_id);
  let post = await post_doc.get();
  let curr_likes = post.data().likes;
  let user_doc = db.collection("users").doc(user_id);
  let user = await user_doc.get();
  if (user.data().liked_posts.includes(post_id)) {
    user_doc.update({liked_posts: firebase.firestore.FieldValue.arrayRemove(post.id)});
    post_doc.update({likes: curr_likes - 1})
  } else {
    user_doc.update({liked_posts: firebase.firestore.FieldValue.arrayUnion(post.id)});
    post_doc.update({likes: curr_likes + 1});
  }
}


/*
* Reports the comment specified by comment_id. This comment
* will no longer be returned by getComments.
*
* Undoing a report must be done manually via the firebase console.
*/
export async function reportComment(comment_id){
  let comment = db.collection("comments").doc(comment_id);
  comment.update({reported: true});
}


/*
* Reports the post specified by post_id. This post
* will no longer be returned by getPosts.
*
* Undoing a report must be done manually via the firebase console.
*/
export async function reportPost(post_id){
  let post = db.collection("posts").doc(post_id);
  post.update({reported: true});
}


/*
* Calculates tree health on a scale from 0-5 based on how many
* posts were made in the last 5 days (exactly 5 days before current time).
*/
export async function calculateTreeHealth(pod_name) {
  let five_days_ago = new Date();
  five_days_ago.setDate(five_days_ago.getDate() - 5);
  const posts = await db.collection("posts").where("reported", "==", false)
                                            .where("pod_name", "==", pod_name)
                                            .where("post_date", ">=", five_days_ago).get();
  let num_posts = 0;
  posts.forEach(doc => {
    num_posts++;
  });
  if (num_posts > 5) {
    num_posts = 5;
  }
  return num_posts;
}
