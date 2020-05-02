import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyDE_YVvYtZe2KoLJo_nUxqYVKj6s1eeFYk",
    authDomain: "invidstor.firebaseapp.com",
    databaseURL: "https://invidstor.firebaseio.com",
    projectId: "invidstor",
    storageBucket: "invidstor.appspot.com",
    messagingSenderId: "325962436500",
    appId: "1:325962436500:web:680a1762fe4ca9551e8981",
    measurementId: "G-TD9WR7DN5K"
};
var fire = firebase.initializeApp(config);
export default fire;