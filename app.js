if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const port = process.env.PORT || 3000;

app.use(expressLayouts);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.post('/', function(req, res) {
    function returnError(errorMessage, formData = null) {
        var siteKey = process.env.SITEKEY || '6LckCYkkAAAAAJrj6icP4cgao8-sbHVzfwEHa7sc';
        res.render('index', { page: 'Home', data: {siteKey, errorMessage, formData}  });
        return;
    }
    if(req.body['order-number'].trim() === '') {
        returnError('Please enter order number', req.body );
    }
    if(!(/^\d{5}(-\d{4})?$/).test(req.body['zipcode'])) {
        returnError('Invalid US Zipcode (e.g.xxxxx or xxxxx-xxxx) : ' + req.body['zipcode'], req.body);
    }
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
    {
        returnError("recaptcha error", req.body);
    }
    const secretKey = process.env.SECRETKEY || '6LckCYkkAAAAAEE-XpuCsCJHd-FWQrIOMP0OJE3o';
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    request(verificationURL,function(error,response,body) {
        if(body) {
            body = JSON.parse(body);

            if(body.success !== undefined && !body.success) {
                returnError("Failed captcha verification", req.body);
            }
            var result = [];
            // todo: query result from api
            if (req.body['order-number'] !== 'no') {
                result = [
                    {
                        orderDate: '11/16/2024',
                        shippedDate: '11/26/2024',
                        name: 'PPVS FORTIFLORA CNNE SUPL 6*30 CNT N9 US',
                        ordered: 200,
                        shipped: 200,
                        tracking: 'https://www.fedex.com/fedextrack/?trknbr=593987129293',
                    },
                    {
                        orderDate: '11/16/2024',
                        shippedDate: null,
                        name: 'PPVD HA FLN 1X8LB US',
                        ordered: 200,
                        shipped: 0,
                        tracking: null,
                    },
                ];
            }
            res.status(200).render('index', { page: 'Tracking Result', data: result});
        } else {
            returnError(error.errorMessage, req.body);
        }
     });
});

// catch 404 and forward to error page
app.use((req, res, next) => {
    res.status(404).render('index', { page: 'Page not found' });
});

app.listen(port, console.log(`Server is listening at port ${port}.`));

