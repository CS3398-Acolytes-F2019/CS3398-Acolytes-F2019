import {Request, Response} from "express";
import { Firebase } from "./Firebase";

export class FileController
{
    
    /**
     * Stores the into Firebase Storage and creates a
     * record of it's storage in the database.
     * @param request The express request object.
     * @param response The express response object
     */
    static store(request: Request, response: Response)
    {

        // something is going to have to be done with it being a streamed upload

        // make sure it's not too big. 1MB for now.
        
        // store it in firebase storage
        // https://firebase.google.com/docs/storage/web/create-reference

        let storage = Firebase.instance.storage();

        // get a reference to storage

        // let storageRef = storage.ref();

        // https://firebase.google.com/docs/storage/web/upload-files



        

        // create a new fileId by creating a random string and making sure that string hasn't been used.
        let fileId = "";

        

        // create a record of it, and it's location with 
        // https://firebase.google.com/docs/database/web/read-and-write
        let database = Firebase.instance.database();
        database.ref("files/" + fileId).set({
            storageUrl: "fakeURL",
            options: {}
        });

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
