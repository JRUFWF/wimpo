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
app.post('/tracking-result', function(req, res) {
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
    {
        return res.json({"responseError" : "captcha error"});
    }
    const secretKey = "174faff8fbc769e94a5862391ecfd010";
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    request(verificationURL,function(error,response,body) {
        if(body) {
            body = JSON.parse(body);

            if(body.success !== undefined && !body.success) {
                // return res.json({"responseError" : "Failed captcha verification"});
            }
            var result = [];
            if (req.body['order-number'] && req.body['zipcode']) {
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
            res.status(200).render('./pages/result', { page: 'Tracking Result', data: result});
        } else {
            return res.json({"responseError" : error});
        }
     });
});

// catch 404 and forward to error page
app.use((req, res, next) => {
    res.status(404).render('404', { page: 'Page not found' });
});

app.listen(port, console.log(`Server is listening at port ${port}.`));

