let mongoose =require('mongoose');

let bookSchema = mongoose.Schema({
   title:String,
   pages:Number,
   authors:[{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Author'
   }]
});

let bookModel = mongoose.model('Book', bookSchema);
module.exports = bookModel;