let Student = require('../models/Student');

module.exports = {
    addNewStudent: function(req,res){
        Student.create(req.body, function(err){
            if (err){
                res.status(500).json(err);
                return;
            }
            res.status(201).json({
                msg: "added successfully"
            })
        })
    },

    getAllStudents: function(req,res){
        Student.find({}).exec(function(err,data){
            res.status(200).json(data);
        })
    }

};