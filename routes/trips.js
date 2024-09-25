var express = require('express');
var router = express.Router();

const Trips = require('../models/trips');
const moment = require("moment");
const {checkBody} = require('../modules/checkBody');

//All the trips
router.get('/', (req, res) => {
	Trips.find().then(data => {
		res.json({ trips : data });
	});
});

router.get("/byDate/:date", (req, res) => {
  Trips.find(req.params.date).then(data => {
    if (data) {
      res.json({ result: true, trips : data });
    } else {
      res.json({ result: false, error: "Date not found" });
    }
  });
});
//search the trips by date
router.get('/departure/:departure/:arrival/:date', (req,res) => {
  //  check that all the body is completed
   /* if (!checkBody(req.body, ['departure', 'arrival', 'date'])) {
        res.json({result: false, error: 'Missing or empty fields'});
        return;
    }
    */
    // get the trips
    const {date} = req.params;
    const searchedDate = new Date(date);
    const {departure, arrival}=req.params;
    Trips.find({departure, arrival, date:{ $gte:moment(searchedDate).startOf('day'), $lte: moment(searchedDate).endOf('day')}
    }).then(data => {
     if (data) {
      res.json({result: true, trips : data});
      } else {
        res.json({result : false, error :"No trip for this date"})
       }
    });
});





router.get("/byId/:id", (req, res) => {
  const tripId = req.params.id;

  Trips.findById({_id: tripId}).then(data => {
    if (data) {
      res.json({ result: true, trip: data });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
});

module.exports = router;

