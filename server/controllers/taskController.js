const express = require('express');
var router = express.Router();

var {Task} = require('../models/task');
var {Labels} = require('../models/labels');

router.get('/',(req,res) => {
    Task.find((err,docs) => {
        if(!err) {
            res.send(docs);
        }
        else {
            console.log(err);
        }
    })
})

router.post('/',(req,res) => {
    var task = new Task({
        task: req.body.task,
        date: req.body.date,
        status : req.body.status,
        linethrough : req.body.linethrough ,
        label : req.body.label 
    });
    task.save((err,doc) => {
        if(!err) res.send(doc);
        else console.log(err);
    })
});

router.delete('/:id',(req,res) => {
    Task.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err) res.send(doc);
        else console.log(err);
    })
})

router.post('/:id',(req,res) => {
    var task = new Task({
        _id : req.body._id,
        task: req.body.task,
        date: req.body.date,
        status : req.body.status,
        linethrough : req.body.linethrough,
        label : req.body.label,
        
    });
    console.log(task)
    Task.findByIdAndUpdate(req.params.id,task, (err,doc) => {
        if(!err) res.send(doc);
        else console.log(err);
    });
})

module.exports = router;