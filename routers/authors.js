let Author = require('../models/Author');
let mongoose =require('mongoose');



module.exports = {
    getAuthors: function(req,res){

        Author.find({}).exec(function(err,authors){
            res.json(authors);
        })

    },

    addNewAuthor: function(req,res){
        let newAuthor = Author(req.body);
        newAuthor.save(function(err){
            if (err)
                res.json(err);
            else
                res.json({
                    msg: 'Author Saved'
                })
        })
    }
};