const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blacklist.model");

// userRouter.post("/register", async (req, res) => {
//   const { username, email, password, role} = req.body;
//   try {
//     const user = await UserModel.findOne({ email });
//     if(user){
//       res.status(201).send({"msg": "User already registered, use different email address."})
//     }else{
//       bcrypt.hash(password, 5, async (err, hash) => {
//         if (err) {
//           res.status(200).send({ error: "error in bcrypt" });
//         } else {
//           const user = new UserModel({ username, email, password: hash, role });
//           await user.save();
//           res.status(200).send({ msg: "A new user has been registered." });
//         }
//       });
//     }
//   } catch (err) {
//     res.status(400).send({ error: "user not found" });
//   }
// });

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if(user){
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
             {user} ,
            "masai"
          );
          res.status(200).send({ msg: "Login Successful", token: token });
        } else {
          res.status(201).send({ msg: "Wrong Credentials" });
        }
      });
    }else{
      res.status(201).send({"msg":"Wrong Credentials"});
    }
  } catch (err) {
    res.status(400).send({ error: "Please register the user" });
  }
});

userRouter.post("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    let newToken = new BlackListModel({ token });
    await newToken.save();
    res.status(200).json({ status: "success", message: "User has been logged out" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

userRouter.get("/", async(req,res) => {
  try{
      const users=await UserModel.find()
      res.status(200).send(users)
  }
  catch(err){
      res.status(400).send({"error":"cannot get user"})
  }
})










userRouter.post("/register", async(req,res,next) => {
  const {username, email, password, role} = req.body
  try {
      if( !username || !email || !password || !role){
          return res.status(400).send({"msg":"al fields mandatory"})
      }
      else {
          const isPresent = await UserModel.findOne({email})
          if(isPresent){
              return res.status(400).send({"msg":"user is already present"})
          }
          else {
              // const newUser = new Users({name,email,avatar})
              bcrypt.hash(password,5,(err,hash)=>{
                  if(err) {
                      res.status(400).send({"msg":"something wrong in bcrypt"})
                  }
                  else{
                      const user = new UserModel({username,email,password:hash, role})
                      user.save()
                      res.status(200).send({"msg":"A new user has been registerd"})     
                  }
              })
          }
      }
  } 
  catch (err) {
      res.status(401).send({"error":"something wrong in catch block for user",err})
  }
})



module.exports = {
  userRouter
};