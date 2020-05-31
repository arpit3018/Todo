const mongoose = require('mongoose');

var Task = mongoose.model('Task', {
    task : {type : String},
    date : {type : Date},
    status : {type : String},
    linethrough : {type : String},
    label : {type : [{
        name : String,
    }]},
});

module.exports = {Task};