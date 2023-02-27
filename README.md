<h3 align="center">
  Desafio Técnico JS Ada
</h3>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/brunoleomont/desafio-tecnico-js-ada.svg">
  
  <a href="https://github.com/brunoleomont/desafio-tecnico-js-ada/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/brunoleomont/desafio-tecnico-js-ada.svg">
  </a>
</p>

<p align="center">
  <a href="#rocket-technology">Technology</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#ballot_box_with_check-prerequisites">Prerequisites</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#up-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## [](#technology):rocket: Technology
-  Javascript
-  Node.js
-  Express.js  
-  Angular
-  Sqlite3
-  Sequelize

## [](#prerequisites):ballot_box_with_check: Prerequisites
-   [Node 18](https://nodejs.org/en/download/)

## [](#getting-started):up: Getting started

-  Clone this repo
## For the Backend
-  Access `cd BACK`
-  Create the file `.env`
-  Add the content: `PORT=5000  
      JWT_SECRET_KEY=your_jwt_secret
      TOKEN_HEADER_KEY=your_token_header_key
      LOGIN=your_login
      PASSWORD=your_password`
-  Run `npm i` to download dependencies.
-  Run `npm start` to start the project
-  Access `http://localhost:5000`


##  For the Frontend
-  Access `cd FRONT`
-  Create the file `src/environments/environment.ts` and `src/environments/environment.development.ts`
-  Add the content in both files:
-  `export const environment = {
      authUrl: 'http://localhost:5000/login',
      cardUrl: 'http://localhost:5000/cards',
      login: 'your_login',
      password: 'your_password'
    };`
-  Run `npm i` to download dependencies.
-  Run `npm start` to start the project
-  Access `http://localhost:4200`

----------

Made with :blue_heart: by brunoleomont  👋  [Get in touch!](https://www.linkedin.com/in/brunoleomont/)
