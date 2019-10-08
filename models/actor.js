let mongoose = require('mongoose');

var actorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required: true
    },
    bYear: {
        validate:{
            validator: function(newYear){
                if(Number.isInteger(newYear))
                    return true
                else
                    return false
            },
            message: "Birth Year should be Integer"
        },
        type: Number,
        required: true
    },
    age: Number,
    movies:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]
});

module.exports=  mongoose.model('Actor', actorSchema);
