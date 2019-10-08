import { Request, Response } from "express";
import { Firebase } from "./Firebase";

export class FileController
{

    /**
     * Creates a reference to the file location in firebase storage,
     * creates a record of the file in the database, and responds
     * with the files upload location, and download url.
     */
    static async store(request: Request, response: Response)
    {
        let fileUrl = await generateUUID();

        const database = Firebase.database();

        database.ref('files/' + fileUrl).set({
            name: request.body.name,
            size: request.body.size,
            options: {
                password: request.body.options.password,
                deleteAfterOneDay: request.body.options.deleteAfterOneDay,
                deleteAfterOneDownload: request.body.options.deleteAfterOneDownload
            }
        });


        let res = {
            fileUrl: fileUrl
        }

        response.send(res);
    }

    /**
     * Returns a reference to requested file.
     */
    static async show(request: Request, response: Response)
    {
        let file = await Firebase.database().ref('users/' + request.params.fileUrl).once('value');
        response.send(file.val());
    }
}

function generateUUID()
{
    let random = ""
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    while (random.length < 10)
    {
        random += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return random;
}