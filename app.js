let bodyParser = require('body-parser');
let express = require('express');
let mongoose =require('mongoose');
let path = require('path')

let actors = require('./routers/actor');
let movies = require('./routers/movie');

const app = express();
app.listen(8080);

app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) throw err;
    console.log('Connect Successfully');
});


//Configuring Endpoints
//Actor RESTFul endpoionts
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.put('/actors/', actors.incrementAge);


app.delete('/actormovie/:id', actors.deleteActorAndMovie);

//Question 3
app.put('/actores/:actorID/:movieID', actors.deleteFromActor);


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll2);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne)
app.delete('/movies/:id', movies.deleteOne);
app.delete('/moviesd/:mYear', movies.deleteBefore);
app.post('/moviesAddActor/:movieid/:actorid', movies.addActor);
app.put('/movies/:movieID/:actorID', movies.deleteFromMovie);

app.get('/movieYear/:year1/:year2', movies.betweenYear);

