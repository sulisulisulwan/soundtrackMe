# soundTrackMe

Welcome to _**soundTrackMe**_ !  A webplatform that brings together filmmakers and composers to bring film scores to life!

## TechStack:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

- Frontend
  * [Composer UI](#composer-ui)
  * [Filmmaker UI](#filmmaker-ui)
- Backend
  * [API](#api)
  * [File upload middleware](#middleware)
  * [Database](#database)
- [Future plans](#future-plans)

>_**soundTrackMe**_ offers two UIs, one for the [aspiring soundtrack composer](soundtrack-composer-ui), one for the [filmmaker](#filmmaker-ui ) searching for their ideal musical collaborator.


# Frontend

## **Composer UI**

### Film Feed
### My Scored Films

## Filmmaker UI

Add Score
Film Feed

# Backend

## API

  soundTrackMe's API allows clients to gain access to JSON records of all film scores as well as movie files in the database.  Through the app, users are able to perform typical CRUD operations on their uploads.

## File upload middleware

soundTrackMe uses the middleware [Multer](https://www.npmjs.com/package/multer) to allow users to upload either mp3s or mp4s.

## Database

soundTrackMe uses a mongoDB database, which stores all user information as well as references to user uploads.

# Future Plans

  * Sessions and cookies implementation for each user sign in.
  * Shared UI Features:
    * Edit soundtrack timestamp position in film
  * Composer Specific Features
    * Portfolio of example scores for perusal
    * Achievement badges
  * Filmmaker UI Features
    * In-app film clip editor
    * Follow composer feature

