# Where is my purina order?

## Built With
* [Express.js](https://expressjs.com)
* [EJS](https://ejs.co)
* CSS3
* [Normalize.css](https://necolas.github.io/normalize.css)
* [nodemon](https://nodemon.io)

## Instructions

After forking and cloning, navigate to the repository in your command line and install the NPM packages:
```
npm install
```

Run the following script in your command line if starting the repository in development mode:
```
npm run dev
```

Run the following script in your command line if starting the repository in production mode:
```
npm start
```

Once the server is running, go to `http://localhost:3000` in your browser.

Test:
-
- 1: if no order number input, return error as please enter order number
- 2: if invalid zipcode input (not xxxxx or xxxxx-xxxx), will see zipcode error with the zipcode input
- 3: if do not click the recaptcha button, return recaptcha error

Todo:
-
- needs to update the faq content when the final one coming up
- needs to update the recaptcha secret key and site key for production
- needs to update the 
