# Image Processing API
Image Processing API is an api library for processing the image into different size based on the following inputs: filename, width, height, and overwrite.  It will return the new image file if it has been successful.

## Table of Contents
* [General Info](#general-information)
* [Technologies](#technologies)
* [Install](#install)
* [Instruction of API Request](#instruction-of-api-request)
* [Purpose of this project](#purpose-of-this-project)
* [Contact](#contact)

## General Information
Users would provide the image name and size through the URL parameter which the Express server would return the new resized image to the front-end.

Patrick would gain his experience developing this image processing API while learning how to set up and work with Express server including NPM, TypeScript, Jasmine, Winston, and node.js.

## Technologies 
- TypeScript
- Express
- ESLint
- Prettier
- Jasmine
- Winston
- Sharp

## Install
Install all the modules
```
npm install
```
Start the server which will also build the TypeScript and start nodemon based on src/index.ts
```
npm run start 
```
Run the test including building the TypeScript into JavaScript
```
npm run test  
```
Start the server based on JavaScript, not TypeScript
```
node dist/index.js
```
To keep the code look clean and nice, run the following command:
```
npm run prettier
```
To check any variable or analyze any code that may look the problem, run the following command:
```
npm run lint
```


## Instruction of API Request
```
localhost:3000/api/images?
    filename={JPG filename that was in assets/full folder}
    &width={width that would be in new image}
    &height={height that would be in new image}
    &overwrite={yes or no} <-- yes means even the resized image file exists. It would be removed and recreated in the process.  Otherwise, if the file exists, it will not recreate the image.
```

## Purpose of this project
This is one of the Full Stack JavaScript Developer's project for Udacity.  It gives Patrick an opportunity to gain experience and knowledge of the following: Express, NodeJS, NPM, Jasmine, and TypeScript.

## Contact
Created by [Patrick Wallin](https://www.linkedin.com/in/patrick-wallin) - feel free to contact me!
