# Encryption Format

* File-trust will encrypt uploaded files via the clients machine only storing the file url and not the key on the server.
* Aiming to use AES-GCM encryption


### Format 
* When file is uploaded by the user the server will upload file to [Firebase server](//firebase.google.com/) with a random key
* URL with key in the fragment portion of URL will be available to client
* With the URL including the fragment a user will be able to download and decrypt the uploaded file

### Benefits
* Server will never save the encrypted key allowing for secure file uploading for users
* A sharable link with the encryption key will be displayed to user in order to allow intended recipients to decrypt uploaded file

### Upcoming 
* Implement random encryption value which appends to the download URL in order to decrypt