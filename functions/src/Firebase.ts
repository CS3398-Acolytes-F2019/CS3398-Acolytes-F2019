import * as firebase from "firebase-admin";

export class Firebase
{

    static get instance(): firebase.app.App
    {
        const config = {
            apiKey: "AIzaSyBaycnVG2ohmhJTYzNVVN__BpB84n8aKDk",
            databaseURL: "https://file-trust.firebaseio.com/",
            storageBucket: "file-trust.appspot.com"
        }

        const firebaseInstance = firebase.initializeApp(config);
        return firebaseInstance;
    }
}