const mongoose = require("mongoose");

const bookSchema= mongoose.Schema(
    {
    title:String,
    discripton:String,
    price:String,
    category:String,
    createdAt: { type: Date, default: Date.now }
    
}
);

const BookModel = mongoose.model("book",bookSchema);

module.exports = {BookModel}