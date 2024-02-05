const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blacklist.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      let existingToken = await BlackListModel.find({ token });

      if (existingToken.length > 0) {
        return res.status(400).send({ error: "Please Login Again!!" });
      }

      jwt.verify(token, "masai", (err, decoded) => {
        if (decoded) {
          req.body.userID = decoded.userID;
          next();
        } else {
          res.send(err);
        }
      });
    } else {
      res.status(400).send("Please login First...");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};


const authorisation = (role)=>{
return (req,res,next)=>{
    if(req.user.role!== "CREATOR"){
        res.status(401).send({"msg":"User cannot perform operation"});
        next();
    }
    else{
        next();
    }
}
}

module.exports = { auth , authorisation };
