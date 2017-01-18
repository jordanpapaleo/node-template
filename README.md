# Node Template

## Setup

This projects assumes that you have node installed.  Its using version 6.

Install all dependencies:

```bash
npm install
```

## Running the project

Run one of the following commands from your server

```bash
npm start # will run a build then serve the static content
npm run dev # will run with hot reloading on a special server
```

## Testing

We are using [Jest](https://facebook.github.io/jest/) https://github.com/facebook/jest

You can run tests by executing any following command in your terminal:

```bash
npm test # lints your project and runs the unit tests suite listed below
npm run test:lint # runs a lint on your project using the .eslintrc file
npm run test:unit # runs only the unit test
npm run test:watch # runs the tests and sets a watch on the project which will re run the test
```

## Code Standards

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
