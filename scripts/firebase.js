// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC5tS2gsHRSKaC2nGNOcSdU2D-Wnmd82aI",
    authDomain: "game-guides-firebase-ff99a.firebaseapp.com",
    databaseURL: "https://game-guides-firebase-ff99a.firebaseio.com",
    projectId: "game-guides-firebase-ff99a",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Make Auth and Firestore references
  const auth = firebase.auth()
  const db = firebase.firestore()