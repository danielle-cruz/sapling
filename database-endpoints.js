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
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCA9SFW7whVX-T2x0yhu2YRgVhJNbuRHpw',
  authDomain: 'sapling-grow.firebaseapp.com',
  databaseURL: 'https://sapling-grow.firebaseio.com',
  projectId: 'sapling-grow',
  storageBucket: 'sapling-grow.appspot.com'
};

firebase.initializeApp(firebaseConfig);
const dbh = firebase.firestore()

export function makePost(title, text, username, accomplished_date) {
  dbh.collection("posts").doc().set({
    title: title,
    text: text,
    comments: [],
    accomplished_date: accomplished_date,
    username: username,
    post_date: firebase.firestore.Timestamp.fromDate(new Date())
  })
}
