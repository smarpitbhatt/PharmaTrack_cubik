const router = require('express').Router();
const Vendor = require('../models/vendor.model');
const VendorOrder = require('../models/vendorOrder.model');

router.get('/', (req, res)=> {
    Vendor.find()
    .then(response=> res.json(response))
})

router.get('/orders/:name', (req, res)=> {
    let name = req.params.name;

    console.log(decodeURI(name))

    VendorOrder.find({ vname: decodeURI(name)})
        .then(docs=> {
            res.json(docs);
        })
        .catch(err=> res.json(err));
});

router.post('/orders/setStatus/:id', (req, res)=> {
    let {status} = req.body;

    VendorOrder.findByIdAndUpdate(req.params.id)
        .then(doc=> {
            if(!doc) return res.json("Order not found");

            doc.status = status;
            console.log(doc);
            doc.save()
                .then(response=> res.json(response))
                .catch(err=> res.json(err));
        })
        .catch(err=> res.json(err));
});

router.post('/add', (req, res)=> {
    let vendor = new Vendor(req.body);
    vendor.save()
    .then(response=> res.json(response))
    .catch(err=> res.json(err));
})


router.post('/purchase', (req, res)=> {
    let { pharmacyName, vname, mname, qty, expectedDelivery, expirydate} = req.body;

    Vendor.findOne({ name: vname, product: mname})
        .then(doc=> {

            console.log(vname);
            console.log(mname);
            if(!doc) return res.json("Vendor not found.");


            let order = new VendorOrder({
                vId: doc._id,
                pharmacyName,
                medicineName: mname,
                quantity: qty,
                status: "pending",
                expectedDelivery: addDays(expectedDelivery),
                expiryDate: expirydate,
                vname:vname
            });

            order.save()
            .then(response=>{console.log(response); res.json(response)})
            .catch(err=> res.json(err));
        })
});

let addDays = (days)=> {

    let d = new Date();

    let totalMils = eval(days*24*60*60*1000 + d.getTime());

    return new Date(totalMils);
}

module.exports = router;