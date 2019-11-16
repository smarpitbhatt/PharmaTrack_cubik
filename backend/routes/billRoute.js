const router = require('express').Router();
const Bill = require('../models/bill.model');

router.get('/', (req, res)=> {

    Bill.find()
    .then(arr=> {
        res.json(arr);
    })
    .catch(err=> res.json(err));
});

module.exports = router;