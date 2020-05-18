var mongoose = require('mongoose');
// const userRouter = require('./routes/usersRoute');
// const productRouter = require('./routes/productRoute');
const alertRouter = require('./routes/alertRoute');
const vendorRouter = require('./routes/vendorRoute');
const medicineRouter = require('./routes/medicineRoute');
const billRouter = require('./routes/billRoute');
const morgan = require('morgan')('tiny');
var app = require('./config/appConfig');
// require('./config/passport');
require('dotenv').config();

app.use(morgan);

const port = process.env.PORT || 5000;

/** 
        Atlas Connection
*/
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, dbName: 'pharmacy' }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
    .catch((err) => console.log("ERROR WHILE CONNECTING TO DB"));

/**  ---   */

app.get('/', (req, res) => {

    console.log("Index / ");
    res.send("Done");

});

// app.use('/user', userRouter);
app.use('/admin/vendor', vendorRouter);
app.use('/admin/alerts', alertRouter);
app.use('/admin/medicine', medicineRouter);
app.use('/admin/bills', billRouter);


app.listen(port, () => console.log(`Server up and Running port: ${port}`));