const mongoose = require('mongoose');

var Labels = mongoose.model('Labels', {
    name : {type : String},
});

module.exports = {Labels};