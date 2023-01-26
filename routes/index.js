const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { page: 'Home' });
});

router.get('/re-captcha', (req, res, next) => {
  res.render('index', { page: 'Recaptcha' });
});

router.get('/tracking-result', (req, res, next) => {
  var result = [
    {
      name: 'PPVS FORTIFLORA CNNE SUPL 6*30 CNT N9 US',
      ordered: 200,
      shipped: 200,
      tracking: 'https://www.fedex.com/fedextrack/?trknbr=593987129293',
    },
    {
      name: 'PPVD HA FLN 1X8LB US',
      ordered: 200,
      shipped: 0,
      tracking: null,
    },
  ];
  res.render('index', { page: 'Tracking Result', data: result} );
});

router.get('/faq', (req, res, next) => {
  res.render('index', { page: 'FAQ' });
});


module.exports = router;
