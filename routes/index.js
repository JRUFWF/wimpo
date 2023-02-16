const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  var siteKey = process.env.SITEKEY || '';
  res.render('index', { page: 'Home', data: {siteKey} });
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
