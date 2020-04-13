# PERSON UI

This React UI allows you to add, search and see the details of your employees.
It consumes [Person API](https://github.com/Tibo46/person-api)
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## PREREQUISITE

- [Node.js and npm](https://nodejs.org/en/) installed globally
- Run `npm install` once the repository is cloned to

## ENVIRONMENT CONFIGURATION

In the root of this repository you can find a .env file.
This file contains the environment variables, such as the API url.
If your Person API runs in a different address than http://localhost:5000, change the value of `REACT_APP_PERSON_API_ORIGIN` to the correct URL.
After any .env change, you need to stop and restart your application.

## AVAILABLE SCRIPTS

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
