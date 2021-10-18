

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