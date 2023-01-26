const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(expressLayouts);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', indexRouter);

app.post('/captcha', function(req, res) {
    console.log('submit for recaptcha');
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
    {
        return res.json({"responseError" : "captcha error"});
        }
        const secretKey = "*******";
        const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        request(verificationURL,function(error,response,body) {
            body = JSON.parse(body);
            if(body.success !== undefined && !body.success) {
                return res.json({"responseError" : "Failed captcha verification"});
            }
            res.json({"responseSuccess" : "Success"});
        });
    });

// catch 404 and forward to error page
app.use((req, res, next) => {
    res.status(404).render('404', { page: 'Page not found' });
});

app.listen(port, console.log(`Server is listening at port ${port}.`));

