const router = require('express').Router();
const Vendor = require('../models/vendor.model');

router.post('/add', (req, res)=> {
    let vendor = new Vendor(req.body);
    vendor.save()
    .then(response=> res.json(response))
    .catch(response=> res.json(err));
})

router.get('/', (req, res)=> {
    Vendor.find()
    .then(response=> res.json(response))
})

module.exports = router;