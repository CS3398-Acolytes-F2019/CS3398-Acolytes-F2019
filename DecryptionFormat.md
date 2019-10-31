# Decrypt Format

* File-trust will decrypt the downloaded file(recieved from the URL) with the key recieved seperately from the sender.
* Aiming to use AES-GCM encryption/decryption

### Format 
* When a valid Firebase download URL is recieved, the user selects the link and File-Trust will decrypt the file(using the key fragment in the recieved URL) and upload the file to the users local machine.

### Benefits
* Server will never recieve or have record of encryption key reassuring file security.
* The sharable link recieved will have the encryption key attached allowing for ONLY the reciepients of this key to access the data intended for transfer.
