import * as firebase from "firebase-admin";


export class Firebase
{
    static get instance(): firebase.app.App
    {
        // const config = {
        //     apiKey: "AIzaSyBaycnVG2ohmhJTYzNVVN__BpB84n8aKDk",
        //     databaseURL: "https://file-trust.firebaseio.com/",
        //     storageBucket: "file-trust.appspot.com"
        // }

        /*
            1. go to project settings in firebase console
            2. go to "Service accounts",
            3. click generate new private key
            4. rename the downloaded private key json file as "ServiceAccountKey.json"
            5. move it into the root project directory "file-trust/ServiceAccountKey.json"
        */
        const serviceAccount = require('../../ServiceAccountKey.json');
        
        var firebaseInstance = firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            // TODO read projectid from ServiceAccountKey.json 
            //      into <projec-id>.appspot.com"
            //storageBucket: "first-project-65df9.appspot.com" 
            storageBucket: "file-trust.appspot.com"
        });
        
        return firebaseInstance;
    }
}