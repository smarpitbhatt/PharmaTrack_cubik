const router = require('express').Router();
const Alert = require('../models/alert.model');
const Medicine = require('../models/medicine.model');

router.get('/', (req, res) => {

    let currTime = new Date().getTime();

    Alert.deleteMany({ severity: 'severe' })
        .then(() => { return Medicine.find(); })
        .then(medicines => {
            return Promise.all(
                medicines.map((item) => {
                    let expTime = new Date(item.expiry).getTime();

                    if (expTime <= currTime) {

                        let alert = new Alert({
                            text: `${item.name} expired`,
                            severity: 'severe'
                        });

                        return alert.save();
                    }
                }))
        })
        .then(() => {

            return Alert.find();
        })
        .then(arr => {
            res.json(arr);
        })
        .catch(err => res.json(err));

});


router.post('/add', (req, res) => {
    let alert = new Alert({
        text: req.body.text,
        severity: req.body.severity
    });

    alert.save()
        .then(response => res.json(response))
        .catch(response => res.json(response));
});

router.delete('/:id', (req, res) => {
    Alert.findByIdAndDelete(req.params.id)
        .then(response => res.json(response));
})

module.exports = router;