const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {

    getAll: function (req, res) {
        Actor.find(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    getAll2: function(req,res){
        Actor.find({}).populate('movies').exec(function(err,actors){
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        })
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id }).populate('movies').exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },

    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },

    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    deleteActorAndMovie: function(req,res){
        Actor.findOneAndRemove({_id:req.params.id}).exec(function(err, actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            for (let i = 0; i <actor.movies.length; i++){
                Movie.findOneAndRemove({_id: actor.movies[i]}, function(err, movie){
                    if (err) return res.status(400).json(err);
                    if (!movie) return res.status(404).json();
                    res.json(actor);
                })
            }
        })
    },

    deleteFromActor: function(req,res){
        Actor.findOne({_id:req.params.actorID}).exec(function(err,actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            let index = 0;
            Movie.findOne({_id:req.params.movieID}, function(err,movie){
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                index = actor.movies.indexOf(movie._id);
                actor.movies.splice(index,1);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            });
        })
    },


    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    incrementAge: function(req,res){
        Actor.updateMany({age:{$gte:50}}, {$inc: {age:4}}, function(err,actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        })
    }
};