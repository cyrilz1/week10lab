let mongoose =require('mongoose');

let studentSchema = mongoose.Schema({
    name:String,
    age:Number

});

let studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;