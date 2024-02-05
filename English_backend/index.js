 const express = require("express");
const { connection } = require("mongoose");
const { userRouter } = require("./routes/user.routes");
const { BookRouter } = require("./routes/book.routes");

 require("dotenv").config();

 const app= express();
 app.use(express.json());

 app.use("/users",userRouter);
 app.use("/books",BookRouter);

 app.listen(process.env.port,async()=>{
try {
    await connection;
    console.log("Database connected");
    console.log(`http://localhost:${process.env.port}`);

} catch (error) {
    console.log("Error in connecting the database");
    console.log(error);
}
 })