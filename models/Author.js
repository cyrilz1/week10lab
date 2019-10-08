let mongoose =require('mongoose');

let authorSchema = mongoose.Schema({
    name:String,
    age:Number,
    address: String,
});

let authorModel = mongoose.model('Author', authorSchema);
module.exports=authorModel;

