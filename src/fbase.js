import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";

let firebaseConfig = {
    apiKey: "AIzaSyBLlUzXUcebhsDgWJAuLWob1rFqF52PL7E",
    authDomain: "pratice-firebase-d71a8.firebaseapp.com",
    databaseURL: "pratice - firebase - d71a8.firebaseapp.com",
    projectId: "pratice-firebase-d71a8",
    storageBucket: "pratice-firebase-d71a8.appspot.com",
    messagingSenderId: "1021481948459",
    appId: "1:1021481948459:web:290fef457ff02c6541216e",
};

firebase.initializeApp(firebaseConfig);
export let firebaseInstance = firebase;
export let authService = firebase.auth();
export let dbSerivce = firebase.firestore();
export let storageService = firebase.storage();