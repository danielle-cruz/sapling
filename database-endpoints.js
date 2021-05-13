// !!! RUN THESE COMMANDS FIRST !!!
// npm install --global yarn
// expo install firebase
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import firebase from 'firebase/app'

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCA9SFW7whVX-T2x0yhu2YRgVhJNbuRHpw',
  authDomain: 'sapling-grow.firebaseapp.com',
  databaseURL: 'https://sapling-grow.firebaseio.com',
  projectId: 'sapling-grow',
  storageBucket: 'sapling-grow.appspot.com'
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const storage_ref = storage.ref();


// Gets the user with specific username.
// If the user doesn't exist yet, create a new user object.
export async function getUser(username){
  const users = db.collection("users");
  const user = await users.where("username", "==", username).get();
  if(user.empty){
    const data = {
      username: username,
      liked_comments: [],
      liked_posts: []
    }
    users.add(data);
    return data;
  }

  user.forEach(doc =>{
    console.log(doc.id, "=>", doc.data());
    return doc.data();
  });
}


// Takes a json as input. Needed fields:
// title - string
// text - string
// accomplished_date - timestamp
// username - string
// pod_name - string
export async function makePost(post_json) {
  const post = await db.collection("posts").add({
    title: post_json["title"],
    text: post_json["text"],
    comment_ids: [],
    accomplished_date: post_json["accomplished_date"],
    username: post_json["username"],
    likes: 0,
    reported: false,
    pod_name: post_json["pod_name"],
    //media_ref: "", //FIX LATER
    post_date: firebase.firestore.Timestamp.fromDate(new Date())
  });
  return post.id;
}


// Returns a list of all posts that haven't been reported for posts in pod_name
// This returns an array of post OBJECTs
// To get the id of a specific post "post", use post.id
// To get the json of info, use post.data()
export async function getPosts(pod_name){
  const posts = await db.collection("posts").where("reported", "==", false).where("pod_name", "==", pod_name).get();
  let all_posts = [];
  posts.forEach(doc => {
    all_posts.push(doc);
  });
  return all_posts;
}

// TODO: Finish and test image functionality
export async function getMedia(post_id){
  const post = await db.collection("posts").doc(post_id);
  return post.data().media_ref.getDownloadURL();
}



// Takes a json as input. Needed fields:
// text - string
// username - string
// post_id - string
export async function makeComment(comment_json) {
  const comment = await db.collection("comments").add({
    text: comment_json["text"],
    username: comment_json["username"],
    likes: 0,
    reported: false,
    post_id: comment_json["post_id"],
    comment_date: firebase.firestore.Timestamp.fromDate(new Date())
  })

  let post = await db.collection("posts").doc(comment_json["post_id"]);
  post.update({comment_ids: firebase.firestore.FieldValue.arrayUnion(comment.id)});

  return comment.id;
}


// Returns a list of comment JSONs
export async function getComments(post_id){
  const post = await db.collection("posts").doc(post_id).get();
  let comments = [];
  let comment_ids = post.data().comment_ids;
  for(var i = 0; i < comment_ids.length; i++){
    let comment_id = comment_ids[i];
    let comment_data = await db.collection("comments").doc(comment_id).get();
    comments.push(comment_data.data());
  }
  return comments;
}

// TODO: Functionality so already liked comments get unliked
// TODO: Fix bugs
// Likes a comment and marks comment as liked for user with user_id
export async function likeComment(comment_id, user_id){
  let comment = await db.collection("comments").doc(comment_id).get();

  let curr_likes = comment.data().likes;
  comment.update({likes: curr_likes + 1});

  let user = await db.collection("users").doc(user_id);
  user.update({liked_comments: firebase.firestore.FieldValue.arrayUnion(comment.id)});
}


// TODO: Functionality so already liked posts get unliked
// TODO: Fix bugs
// Likes a post and marks post as liked for user with user_id
export async function likePost(post_id, user_id){
  let post = await db.collection("posts").doc(post_id);

  curr_likes = post.data().likes;
  post.update({likes: curr_likes + 1});

  let user = await db.collection("users").doc(user_id);
  user.update({liked_posts: firebase.firestore.FieldValue.arrayUnion(post.id)});
}

// TODO: test
// Reports a comment
export async function reportComment(comment_id){
  let comment = await db.collection("comments").doc(comment_id);
  comment.update({reported: true});
}

// TODO: test
// Reports a post
export async function reportPost(post_id){
  let post = await db.collection("posts").doc(post_id);
  post.update({reported: true});
}
