var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },

    getAll2: function(req,res){
      Movie.find({}).populate('actors').exec(function(err,movies){
          if (err) return res.status(400).json(err);
          res.json(movies);
      })
    }
    ,

    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },

    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    deleteOne: function(req,res){
        Movie.findOneAndRemove({_id: req.params.id}, function(err,movie){
            if (err) return res.status(400).json(err);
            res.json();
        })
    },

    deleteFromMovie:function(req,res){
        Movie.findOne({_id:req.params.movieID}).exec(function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            let index = 0;
            Actor.findOne({_id:req.params.actorID}, function(err,actor){
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                index = movie.actors.indexOf(actor._id);
                movie.actors.splice(index,1);
                movie.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },

    deleteBefore: function(req,res){
       Movie.where('year').lt(req.params.mYear).exec(function(err,movies){
         for (i = 0;i < movies.length;i ++){
            Movie.findOneAndRemove({_id: movies[i].id},function(err,movie){
              if(err) return res.status(400).json()
              res.json();
            })
         }
         res.json(movies)
       })
    },

    addActor: function (req, res) {
        Movie.findOne({_id: req.params.movieid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: req.params.actorid }, function (err,actor){
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },

    betweenYear: function(req,res){
        let year1 = parseInt(req.params.year1);
        let year2 = parseInt(req.params.year2);
        if (year1 > year2){
        Movie.find({$and: [ {year: {$lte: year1}}, {year:{$gte:year2}}] }).exec(function(err,movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
        }
    }


};

