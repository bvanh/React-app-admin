const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseApp = firebase.initializeApp({
  // copy and paste your firebase credential here
  apiKey: "AIzaSyCxB0ESzcpgJmaEFg6VFeSqC_U4mEhRHuo",
  authDomain: "hotel-demo-data.firebaseapp.com",
  databaseURL: "https://hotel-demo-data.firebaseio.com",
  projectId: "hotel-demo-data",
  storageBucket: "hotel-demo-data.appspot.com",
  messagingSenderId: "201819256761",
  appId: "1:201819256761:web:42d45b39395e4d6d14a868",
  measurementId: "G-7JTQ6H0HVC"
});

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export {  db,storage as default} ;
