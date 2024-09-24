var express = require('express');
var router = express.Router();

const connection = require('../models/connection');
const Cart = require('../models/cart');

//create new trip in the cart
router.post('/', (req, res) => {
    // Creates new document with cart data
    const newCart = new Cart({
        departure: req.body.departure,
        arrival: req.body.arrival,
        schedule: req.body.date,
        price: req.body.price,
    });
    // Finally save in database
    newCart.save().then(newCart => {
        res.json({ result: true, newCart });

    });
});

//search all the trips in cart
router.get('/', (req, res) => {
    Cart.find().then(data => {
        res.json({ Cart: data });
    });
});

//find trip in cart by Id
router.get("/:id", (req, res) => {
    Cart.findOne({_id :req.params.id}).then(data => {
        if (data) {
            res.json({ result: true, Cart: data });
        } else {
            res.json({ result: false, error: "Trip not found in cart" });
        }
    });
});
//delete one trip in th cart
router.delete("/:id", (req, res) => {
    Cart.deleteOne({_id :req.params.id}).then(deletedDoc => {
        if (deletedDoc.deletedCount > 0) {
            // document successfully deleted
            Cart.find().then(data => {
                res.json({ result: true, Cart: data });
            });
        } else {
            res.json({ result: false, error: "Trip not found in cart" });
        }
    });
});

module.exports = router;