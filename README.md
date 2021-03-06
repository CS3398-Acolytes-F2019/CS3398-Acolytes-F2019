# file-trust

![image](https://drive.google.com/uc?export=view&id=1rEjLaJfcg54Llk5pE-2HQSTQ4pAbPvH-)

Created by
* Jacob Hope
* Ky Le
* Austin Gray
* Jonathan Joiner
* Damen Hannah

Who would use this application?
* People who care about data privacy and security.
* People who would like to have a simple way to store and retrieve data quickly.
* People who would like to access their data remotely.

### We are making a safer web.

## Sprint 1 in Review

### Accomplishments

#### Damen

I created the file input, the status circle, file streaming.

This Vue component triggers a browser event to choose a file on one's system, and emits a reference to that file for further use.
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/blob/master/src/components/FileInput.vue

This should show the progress of the download/encryption. Because this only updates as each chunk of the file is streamed, and only one chunk is processed right now (1MB chunks, 1MB file size limit), it does not update before completion. This will be fixed in the future.
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/blob/master/src/components/ProgressCircle.vue

This is how we will be able to handle larger files, doing a streaming upload and encryption. Right now it's not really being used to it's full potential.
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/blob/master/src/modules/FileStream.ts

#### Jacob

I created the Firebase class, FileController functions, macOS setup instructions, and the app's infographic.

The following class I wrote, [Firebase](https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/6ecf78ce41ef83cc8924e883b01d1ff647ee2a50), handles initializing a secure and stable connection to upload and download to and from the Firebase bucket using Firebase-Admin module. To connect, it reads a JSON file, that for security purposes is not on this repo and is added in the [.gitignore](https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/8a460a8ecd5de4fbeb082a405e2d09734437c5c4) since it contains a private key, sends it to the Firebase server, has the information verified, and then upon successful verification the connection between the file-trust app and Firebase is created allowing for the file-trust app to make Firebase api calls.

When a successful connection is made between the file-trust app and the Firebase bucket, the store function I wrote in, [FileController](https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/c9a151d03f904220183e464f9417843b0d30f166), is able to successfully upload a file to a Firebase bucket.

For MacOS, I wrote additional [setup instructions](https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/55232331d4c6172afa0ffbd1b329076c7d227960).

Additionally, I created the [file-trust graphic](https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/7c587d2dd6c7047c500ec07a1f96743ce395c300) for this README.

#### Ky Le
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/08629f999c4efda041392f8da6a0139ba5fd3b4d
Create User Interface(UI) 
Using Vue and Vue's components such as:
- web title.
- animation circle when uploading file, so it will let's us know when a file is being loaded completely.
- a input box, which links to local directory in your computer, will let you choose the file that you want to share.
- a input box (optional), which let users enter a password.
- a check box, which gives users option to delete the file after 1 day.
- a check box, which gives users option to delete the file after 1 download.
- a Encrypt and upload button, which will link to the encrypt function and then upload the file.

- After a file is loaded, a URL will be generated. 

#### Austin
Worked on File Uploading and diving into how we want to go about encrypting and decrypting files.

This .md will continuosly be updated to track our progress with the encrypting format and process. 
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/blob/master/EncryptionFormat.md

#### Jonathan
Further researched the decryption process in terms of improvment of the AES-256 encryption/decryption process.
However I was unable to improve the process. The process we currently have is effective.

- A .md has been created (https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/blob/master/DecryptionFormat.md) discussing the methods and the benefits of the decryption we have chosen to use.

### Status

Upload and sharing feature is done, however heavy refactorings are expected.

#### Damen
- Making good progress. Biggest priority is getting team memebers on the same page.

#### Jacob
- Making good progress learning about Firebase and implementing code to interact with Firebase.
Next steps are to bring the team on the same page and continue learning and implementing more Firebase features.

### Ky
- Will be working on making the UI more attractive and more functions added.

### Austin
- Working to being encrpyting files now that we have the functionality.  Finding the best format to go about this by researching similar examples and seeing what makes sense for our implementation.

#### Jonathan
- Working on improving file encryption and decryption.


## Sprint 2 Retrospective

### Accomplishments

#### Damen

I created the dashboard, and streamlined streaming upload and download.

This commit streamlines the file upload.
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/04b47d3b27240ef693e1aee2944ce0cf4136f7f7

This commit streamlines the file download.
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/b63f36ebf1172ff30a5685a3c348ad1829aa6204

This commit implements the dashboard
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/ce73090e37b4e4cbb4cfece64cbc16993912a220

This commit implements upload on the dashboard.
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/30a9ae1eba9e0016cc4b7c5b3ce84e78dcc33e23


#### Ky Le
- Created Narbar which included multiple buttons (Dashboard, Login, Logout).
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/5ad2ab272f44928e29f51c1dd222bb3d553f29fb

#### Austin
- I worked on encrypting our uploaded files in an AES-GCM form.
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/blob/master/src/modules/Encrypt.ts

#### Jacob
- I researched into best methods and technologies for adding analytics to our app.
https://github.com/cs3398-acolytes-f2019/cs3398-acolytes-f2019/issues/62

#### Jonathan
- Researched methods of improving the decryption method while collaborating with Austin.
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/blob/master/DecryptionFormat.md 

### Status

#### Damen
- Progress is steady. Look forward to making the dashboard functional

#### Ky 
- Will be working on implementation on Login and Register functionalities.

#### Austin
- Working on implementing encryption for files larger then one chunk

#### Jacob
- Progress initially slow with analytics. Should have iceboxed research time. However, next sprint should be much more productive in implementing analytics into our app.

#### Jonathan
- Continuing to implement and improve the decryption process.

## Sprint 3 Retrospective
### Accomplishments

#### Ky Le
  https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/5db58499a540717306ba6bf61c2dd2bc843ed1c6
  https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/f772343084092fdaa411a00678d697aece3b71f5
- Modified Firebase for Authentication by using email.
- Implemented functionalities of login, resgiter.
- Retricted dashboard and logout buttons which are only appeared when logging in otherwise they would be hidden. 
- Retricted login and register bottons which are only appeared when not logging in otherwise they would be hidden.
- Showing emails of users when logging. 

#### Damen

Improved the UI for the navbar
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/1af620656113f5d1debfb88f54fe331eb2e6ed29

Improved the UI for Upload View
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/48f958a40f9aca7008e01755d1c7a1e0b7e2b798

Improved the UI for the Download View
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/a38d7ca577f94b335a42c91acad9a0d11fb674fe

Improved the UI for the Login View
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/a00ba1acbc66f22feaf8ee08d15cd73ee4032a0e

Improved the UI for the Register View
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/11150a199b37adf110dda1e02c658f3de31143a8

Improved the UI for the Home view
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/11150a199b37adf110dda1e02c658f3de31143a8

#### Jonathan

Worked on finding a method of improving the decryption and encryption process, found that ours was rater effective.

#### Austin
Worked to refactor encyrption process.

#### Jacob
Refactored navbar UI code by adding more container classes for better organization.
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/64d8cdbed2f035bd6156071e6dda2239b1b5b3fa

Further improved navbar UI alignment
https://github.com/CS3398-Acolytes-F2019/CS3398-Acolytes-F2019/commit/7a9db814180feb89d5557c49fcb187d15d0f7a7e

### Status

#### Ky
begin work on multiple sign in methods, such as using existing google, facebook accounts.

#### Damen 

Finished with a general polishing of the UI across the entire app.

#### Jonathan

Begin work on addtional features.

#### Austin

Work to further improve user options when uploading downloading files.

#### Jacob

Work to add data analytics hooks and save that data to Firebase.


## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
Add more general information about project. What the purpose of the project is? Motivation?

## Screenshots
![Example screenshot](./img/screenshot.png)

## Technologies
* [NodeJS](//nodejs.org/en/)
* [Express](//expressjs.com/)
* [TypeScript](//www.typescriptlang.org/)
* [Firebase](//firebase.google.com/)

## Setup

### Windows
Sorry, we don't develop on Windows OS, we highly recommend installing WSL Ubuntu 18.04 LTS.
We do however recommend using [Visual Studio Code](https://code.visualstudio.com/)

> Start

> Search for "Windows Store"

> Open Windows Store

> Search for "Ubuntu"

> Select and install Ubuntu 18.04 LTS

### Install NodeJS version 12.10.0

#### Mac
> Have [Homebrew](https://brew.sh/) installed

> ``brew install node@12.10.0``

#### Ubuntu
In terminal, run
> ``sudo apt-get install curl``

> ``curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -``

> ``sudo apt-get install nodejs``

#### Mac and Ubuntu

Check version with
> ``node -v``

> ``npm -v``

### Install Vue CLI globally.

> ``sudo npm install -g @vue/cli``

#### Mac and Ubuntu

Check version
> ``vue --version``

In the project directory run
> ``npm run serve``

A working version of the client will be available at ``localhost:8080``. Changes will automatically be compiled and the page will refresh.

### Install n to manage node versions

> ``sudo npm install -g n``

> ``sudo n 8``

### Install Firebase CLI
> ``sudo npm install -g firebase-tools``

> ``cd functions``

> ``sudo npm install``

## Code Examples
Show examples of usage:
`put-your-code-here`

## Features
List of features ready and TODOs for future development
* Upload Confirmation: Confirmation feature ensuring users that their files were properly uploaded
* Secure file upload: Private file sharing between users denying viasbility to outside sources
* Account Creation: Ability to create an account that will allow users to see what files have been uploaded
* Seamless user interface: Users will have ability to know files sent and recieved were transmitted correctly and have not been compromised.

To-do list:
* Wow improvement to be done 1
* Wow improvement to be done 2

## Status
Project is: _in progress_, _finished_, _no longer continue_ and why?

## Inspiration
Add here credits. Project inspired by..., based on...

## Contact
Created by [@flynerdpl](https://www.flynerd.pl/) - feel free to contact me!
