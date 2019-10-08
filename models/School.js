let mongoose =require('mongoose');

let schoolSchema = mongoose.Schema({
    name:String,
    address:String,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]

});

let schoolModel = mongoose.model('school', schoolSchema);
module.exports = schoolModel;