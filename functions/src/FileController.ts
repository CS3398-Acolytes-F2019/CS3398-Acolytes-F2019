import {Request, Response} from "express";
import { Firebase } from "./Firebase";

export class FileController
{

    private static emulatedStorage = new Array<any>();
    
    /**
     * Stores the into Firebase Storage and creates a
     * record of it's storage in the database.
     * @param request The express request object.
     * @param response The express response object
     */
    static store(request: Request, response: Response)
    {
        // TODO limit file to 1MB for now.

        // get a reference to storage
        // let storageRef = Firebase.instance.app().storage().ref();
        var bucket = Firebase.instance.storage().bucket();

        //TODO following code works on its on but not with express yet
        bucket.upload('local/image.jpg', { // local destination
            destination: 'images/image.jpg', // Bucket destination
            gzip: true,
            metadata: {
                cacheControl: 'public, max-age=31536000'
              }
        }).then(() => {
            // TODO send success via response
            console.log('File uploaded');
        }).catch(err => {
            // TODO send error via response
            console.log('ERROR:', err);
        });

        // https://firebase.google.com/docs/storage/web/upload-files

        // // TODO create a new fileId by creating a random string and making sure that string hasn't been used.
        // let fileId = "";

        // // TODO create a record of it, and it's location with 
        // // https://firebase.google.com/docs/database/web/read-and-write
        // let database = Firebase.instance.database();
        // database.ref("files/" + fileId).set({
        //     storageUrl: "fakeURL",
        //     options: {}
        // });
    }

    /**
     * Returns a link to the requested file.
     * @param request The express request object.
     * @param response The express response object
     */
    static show(request: Request, response: Response)
    {
        // make sure it hasn't been downloaded too many times.
    }
}