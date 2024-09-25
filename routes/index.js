var express = require('express');
var router = express.Router();

require('../models/connection');
const Users = require('../models/users');
const Trips = require('../models/trips');
// const Cart = require('../models/cart');
const Bookings = require('../models/bookings');
const {checkBody} = require('../modules/checkBody');

module.exports = router;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
