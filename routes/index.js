const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { page: 'Home' });
});

router.get('/captcha', (req, res, next) => {
  res.render('index', { page: 'Recaptcha' });
});

router.get('/tracking-result', (req, res, next) => {
  var result = [
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
  res.render('index', { page: 'Tracking Result', data: result} );
});

router.get('/faq', (req, res, next) => {
  var faqs = [
    {
      question: 'HOw Will it take for me to get my order?',
      answer: 'Please allow 5-6 days for shipment of order....'
    },
    {
      question: 'Who can i contact if i have a question?',
      answer: 'Please email customerservice@purina.com'
    },
    {
      question: 'XXXXXXXXX',
      answer: 'XXXXXX'
    },
  ];
  res.render('index', { page: 'FAQ', data: faqs });
});


module.exports = router;
