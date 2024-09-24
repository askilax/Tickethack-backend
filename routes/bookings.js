var express = require('express');
var router = express.Router();

const connection = require('../models/connection');
const Bookings = require('../models/bookings');

router.post('/', (req, res) => {
	
	// Creates new document with booking data
			const newBooking = new Bookings({
				departure: req.body.departure,
				arrival: req.body.arrival,
				schedule: req.body.date,
				price: req.body.price,
				});
	// Finally save in database
			newBooking.save().then(newBooking => {
				res.json({ result: true, newBooking});
				});
});
		
router.get('/', (req, res) => {
	Bookings.find().then(data => {
		res.json({ Bookings : data });
	});
});

router.get("/:id", (req, res) => {
  Bookings.findOne({_id :req.params.id}).then(data => {
    if (data) {
      res.json({ result: true, booking: data });
    } else {
      res.json({ result: false, error: "Booking not found" });
    }
  });
});

router.delete("/:id", (req, res) => {
  Bookings.deleteOne({_id :req.params.id}).then(deletedDoc => {
    if (deletedDoc.deletedCount > 0) {
      // document successfully deleted
      Bookings.find().then(data => {
        res.json({ result: true, booking : data });
      });
    } else {
      res.json({ result: false, error: "Booking not found" });
    }
  });
});

module.exports = router;