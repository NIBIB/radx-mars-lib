# MARS Library

Welcome to the MARS Library project. This README will help you set up the development environment, make changes, run
tests, and contribute back to the project.

## Prerequisites

1. **Node.js and NPM:** We recommend using Node Version Manager (NVM) to manage your Node.js and NPM installations. To
install NVM, follow the instructions in the [NVM repository](https://github.com/nvm-sh/nvm#installing-and-updating).

   Once you've installed NVM, install Node.js and NPM by running the following command:

   ```
   nvm install node
   ```

   This will install the latest version of Node.js and NPM. To use this version of Node.js in your current terminal
   session, use the command:

   ```
   nvm use node
   ```

## Project Setup

1. **Clone the repository:** First, you'll need to clone the repository to your local machine. You can do this by
running:

   ```
   git clone https://github.com/NIBIB/radx-mars-lib.git
   ```

2. **Navigate into the project directory:** Once the repository is cloned, navigate into the project directory by
running:

   ```
   cd radx-mars-lib
   ```

The directory may vary depending on your cloning process.

3. **Install dependencies:** The project has some dependencies which you can install using NPM. From the project
directory, run:

   ```
   npm install
   ```

   This command will read the `package.json` file in the project directory, and install the necessary dependencies
   listed there.

## Making Changes

Now that your environment is set up, you're ready to start making changes. Open the project in your preferred text
editor or IDE and make your changes.

## Testing

We use Jest to test our project. To run the tests, use the command:

```
npm run test
```

Before deploying the changes, it's important to ensure that all tests are passing.  You will need to write tests for any
new functionality you implement.

## Building

To compile the TypeScript code to JavaScript, use the command:

```
npm run build
```

This will create a `dist` folder in your project directory with the transpiled JavaScript files.

## Deployment

If the code builds successfully and all tests pass, you're ready to push your changes to the repository:

```
git add .
git commit -m "Your descriptive commit message"
git push
```

Make sure your code commit is not attempted against the main branch.  Once your code has been submitted, open a pull
request for review and inclusion in the project.

That's it! You've now successfully made and tested changes to the MARS Library project.

