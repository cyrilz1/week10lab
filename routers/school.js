let School = require('../models/School');
let Student = require('../models/Student');
let mongoose = require('mongoose');

module.exports = {
    addNewSchool: function(req,res){
        School.create(req.body,function(err){
            if (err){
                res.status(500).json(err);
                return;
            }
            res.status(201).json({
                msg: "School created Successfully"
            });
        })
    },

    getAllSchool: function(req,res){
        School.find({}).exec(function(err,data){
            res.status(200).json(data);
        })
    },

    enrollStudent: function(req,res){
        let studentId = req.query.stnId;
        let schoolId =  req.body.schoolId;

        Student.findById(studentId).exec(function(err,student){
            School.findById(schoolId).exec(function(err,school){
                school.students.push(student);
                school.save(function(err){
                    res.json({
                        msg: "student has been enrolled"
                    })
                })
            })
        })


    }
};