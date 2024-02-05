const mongoose= require('mongoose');

const userSchema = mongoose.Schema({
    username:String,
    email: String,
    password:String,
    role:{type: String, enum:["CREATOR","VIEW_ALL"]}
},{
    versionKey: false,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel}