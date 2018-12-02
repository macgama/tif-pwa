import * as firebase from "firebase/app";
import "firebase/auth";

// var config = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID
// };

var config = {
    apiKey: "AIzaSyAM6LAjoitrT8oBtMvK9JR7dIUDlcMJR7g",
    authDomain: "tif-pwa-a7970.firebaseapp.com",
    databaseURL: "https://tif-pwa-a7970.firebaseio.com",
    projectId: "tif-pwa-a7970",
    storageBucket: "tif-pwa-a7970.appspot.com",
    messagingSenderId: "861826276315"
}

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());
export const Auth = firebase.auth();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
