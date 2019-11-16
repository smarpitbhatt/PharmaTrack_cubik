const router = require('express').Router();
const Medicine = require('../models/medicine.model');
const Alert = require('../models/alert.model');
const Bill = require('../models/bill.model');

async function fetchAndAdd(item) {
    console.log(item);
    await Medicine.findOne({ name: item.medicine })
        .then(medicine => {
            console.log(medicine);
            medicine.quantity += Number(item.quantity);
            if (medicine.quantity < 15) {
                let alert = new Alert({
                    text: `${medicine.name} quantity running low`,
                    severity: 'medium'
                })
                alert.save();
            }

            medicine.save()
                .then()
                .catch();
        })
        .catch(err => console.log(err));

}

router.post('/add', (req, res) => {
    // let medicine = new Medicine(req.body);
    let { items } = req.body;

    console.log(req.body);

    // Medicine.findOne({ name: name})
    // .then(old=> {
    //     old.quantity +=Number(req.body.quantity);
    //     old.save()
    //     .then(mesg => res.json("old Increment!"));
    // })
    // .catch(err=> {
    //     medicine.save()
    //     .then(mesg => res.json("New Medicine Added!"));
    // })

    items.forEach(item => {
        fetchAndAdd(item);
    });
    res.json('ok');
})

router.get('/', (req, res) => {
    Medicine.find()
        .then(response => res.json(response));
})

async function fetchAndChange(item, qty) {
    await Medicine.findOne({ name: item })
        .then(async medicine => {
            console.log(medicine)
            if (!medicine || medicine.quantity < qty) {
                return;
            }

            medicine.quantity -= qty;

            if (medicine.quantity <= 10) {
                let alert = new Alert({
                    text: `${medicine.name} quantity running low`,
                    severity: 'medium'
                })
                alert.save();
            }

            await medicine.save()
                .then()
                .catch();
        })
        .catch();
}

router.post('/purchase', (req, res) => {
    console.log(req.body);
    const { items, docname, custname, contact, tax, totalcost } = req.body;

    items.forEach(item => {
        fetchAndChange(item.name, item.quantity);
    });

    let bill = new Bill({
        docname,
        custname,
        contact,
        items: items,
        total: totalcost,
        tax,
        date: new Date()
    });

    bill.save();
    res.send({ message: 'ok', success: true })

})

module.exports = router;