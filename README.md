# Getting Started
In order to build this application, you're going to need a few things setup in your environment.
## Tools to download
- [Node 14](https://nodejs.org/en/) - First you need to make sure you install a version of node version 14.  [I recommend using nvm](https://github.com/nvm-sh/nvm) so that you can change your environment version easily.
- [Postgres](https://www.postgresql.org) - You will need to have access to a postgres server in order to run this.  You can setup any username or database you want, but make sure to put that information in the `.env` file.  You can check out `.env.example` for information on how to do this..
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) - You need the Heroku CLI to run the local server, as well as work with any dev hosting you may want to host.  Among the other things this does, when you run `heroku local` it accesses the local `.env` file for information about your database configuration.

## Run the app
1. `yarn` - Update your depenedencies. You should do this every time you pull from github.
2. `heroku local` - Run the server. This hosts the backend.
3. `yarn dev` - Host a hot reloading version of the React client app.

# Technologies
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- [Github](https://github.com/robinmaypanpan/grocerylist) - Place for storing git repositories and collaborating
- [git](https://git-scm.com/doc) - Technology for enabling version control
- [Heroku](https://www.heroku.com/home) - Free web hosting service perfect for tiny apps like these
    - [Getting started with node js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
    - [Examples](https://github.com/heroku-examples)
    - [Create-react-app buildpack](https://github.com/mars/create-react-app-buildpack#user-content-generate-a-react-app) - Uncertain how this actually works with Heroku and Create-react-app
- [Postgres](https://www.postgresql.org) - Database system that Heroku runs.
- [React](https://reactjs.org) - UI framework for building visual apps
- [Redux](https://redux.js.org) - State management system for React
- [Figma](https://www.figma.com/files/recent?fuid=1031803273450151713) - UI Design tool
- [ExpressJS](https://expressjs.com) - Software for writing servers in NodeJS
- [Font Awesome](https://fontawesome.com/v5.15/icons?d=gallery&p=1&m=free) - Free icons

# Folders
- **src** - Location for the React web client
  - *index.jsx* - Starting point for React web client
  - *setupTests.js* - Runs prior to running tests.
  - **.test.js* Files that test a component
- **server** - ExpressJS based server hosting backend and database access
  - *index.js* - Starting point for server
  - *test.js* - Starting point for server side tests
- **public** - HTML, images, etc that are uploaded directly
- **build** - Output of the **yarn build** command.
- **.env.example* - Example *.env* file. Copy this into your folder.
# Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Version History
*0.7.0*
- 

*0.6.1*
- Fixed bug with dates not correctly being added to new items
  
*0.6.0*
- Major UI refresh
- Fixed bug in establishing a fresh database
- Added button to easily create new lists
- Added button to clear checked off items
- Switched backend access over to knex
- Added dates to items in the lists
- Fixed bug with adding the app to a home screen

*0.5.0*
- UX Cleanup on ViewList page. Smaller buttons
- Edit mode to protect against accidental deletions
- The ability to check things off without deleting them!
- Date added information!
- @orikalin rewrote the main part of the app!
- Added lots of database doodads, including database versioning and the ability to migrate to new versions of the db.

*0.4.0*
- Fixed scrolling list formatting
- Changed centering of text on most buttons
- Modified iconography to use Font Awesome