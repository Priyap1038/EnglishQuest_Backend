const express = require("express");
const { BookModel } = require("../model/book.model");
const { authorisation } = require("../middleware/auth.middleware");

const BookRouter = express.Router();

BookRouter.get("/",async(req,res)=>{
try {
    const books = await BookModel.find();
    res.send(books);

} catch (error) {
    res.send({"msg":"No books available"});
}
})

BookRouter.post("/create", authorisation, async(req,res)=>{
    const book = req.body;
    try {
        const newBook = new BookModel({book})
        await newBook.save();
        res.status(200).send({ msg: "A new book has been created." });

    } catch (error) {
        res.status(200).send({ msg: "A new book has been created." });
    }
})

module.exports = {BookRouter}