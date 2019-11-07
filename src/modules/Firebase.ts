import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/storage';

/**
 * TODO:
 * Use dotenv package to pull from a non-versioned .env file.
 */

const config = {
    apiKey: "AIzaSyBaycnVG2ohmhJTYzNVVN__BpB84n8aKDk",
    databaseURL: "https://file-trust.firebaseio.com/",
    storageBucket: "gs://file-trust.appspot.com"
}
export const Firebase = firebase.initializeApp(config);
