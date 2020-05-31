const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CrudDB', (err) => {
    if(!err) {
        console.log("Connection Successful..");
    }
    else {
        console.log("Connection Failed");
    }
});
module.exports = mongoose;