var express = require('express');
var router = express.Router();

const connection = require('../models/connection');
const Bookings = require('../models/bookings');



// Route POST - Add a new booking
router.post('/', (req, res) => {
  //  find if a trip is paid or not and add it to the card or to the booking
  const newBooking = new Bookings({
      departure: req.body.departure,
      arrival: req.body.arrival,
      schedule: req.body.date,
      price: req.body.price,
      isPaid: req.body.isPaid || false,  // by default it is false
  });

  // Save data in data base
  newBooking.save().then(savedBooking => {
      res.json({ result: true, booking: savedBooking });
  });
});

// Route GET -for paid and unpaid bookings
router.get('/', async (req, res) => {
  const bookings = await Bookings.find({ isPaid: true });

  if (bookings.length > 0) {
      res.json({ result: true, bookings });
  } else {
      res.json({ result: false, message: 'booking not found' });
  }
});



// Route GET for available or unavailable cart
router.get('byCart/cart', async (req, res) => {
  const cart = await Bookings.find({ isPaid: false });

  if (cart.length > 0) {
      res.json({ result: true, cart });
  } else {
      res.json({ result: false, message: 'cart not found' });
  }
});



// Route GET - find a trip by ID
router.get("/fbyId/:id", (req, res) => {
  Bookings.findOne({ _id: req.params.id }).then(data => {
      if (data) {
          res.json({ result: true, booking: data });
      } else {
          res.json({ result: false, error: "Booking not found" });
      }
  });
});

// Route DELETE - delete a trip ID
router.delete("/delById/:id", (req, res) => {
  Bookings.deleteOne({ _id: req.params.id }).then(deletedDoc => {
      if (deletedDoc.deletedCount > 0) {
          // deletion done
          Bookings.find().then(data => {
              res.json({ result: true, bookings: data });
          });
      } else {
          res.json({ result: false, error: "Booking not found" });
      }
  });
});

module.exports = router;

// router.post('/', (req, res) => {
	
// 	// Creates new document with booking data
// 			const newBooking = new Bookings({
// 				departure: req.body.departure,
// 				arrival: req.body.arrival,
// 				schedule: req.body.date,
// 				price: req.body.price,
// 				});
// 	// Finally save in database
// 			newBooking.save().then(newBooking => {
// 				res.json({ result: true, newBooking});
// 				});
// });
		
// router.get('/', (req, res) => {
// 	Bookings.find().then(data => {
// 		res.json({ Bookings : data });
// 	});
// });

// router.get("/:id", (req, res) => {
//   Bookings.findOne({_id :req.params.id}).then(data => {
//     if (data) {
//       res.json({ result: true, booking: data });
//     } else {
//       res.json({ result: false, error: "Booking not found" });
//     }
//   });
// });

// router.delete("/:id", (req, res) => {
//   Bookings.deleteOne({_id :req.params.id}).then(deletedDoc => {
//     if (deletedDoc.deletedCount > 0) {
//       // document successfully deleted
//       Bookings.find().then(data => {
//         res.json({ result: true, booking : data });
//       });
//     } else {
//       res.json({ result: false, error: "Booking not found" });
//     }
//   });
// });

// module.exports = router;