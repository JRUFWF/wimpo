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
In order to enable the recaptcha test,  in development as we are using a self signed certificate for SSL communication
```
NODE_TLS_REJECT_UNAUTHORIZED='0' node app.js
```
Run the following script in your command line if starting the repository in production mode:
```
npm start
```

Once the server is running, go to `http://localhost:3000` in your browser.
