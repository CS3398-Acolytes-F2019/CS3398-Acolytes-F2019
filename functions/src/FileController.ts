import {Request, Response} from "express";
import * as admin from 'firebase-admin';

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
        const database = admin.firestore();
        // make sure it's not too big.

        // response.send
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