var mongoose = require('mongoose');
var app = require('./config/appConfig');
require('dotenv').config();

const port = process.env.PORT || 5000;

/** 
        Atlas Connection
*/
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:  true, useUnifiedTopology: true, dbName: 'pharmacy'}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
.catch((err)=>console.log("ERROR WHILE CONNECTING TO DB"));

/**  ---   */

app.get('/', ( req, res)=>{

 console.log("Index / ");
 res.send("Done");

});


app.listen(port, ()=>console.log(`Server up and Running port: ${port}`));
