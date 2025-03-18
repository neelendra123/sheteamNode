const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require("bcryptjs");

var schema = mongoose.Schema({
    name     :      {type:String, required: true},
    username :      {type:String, required: true},
    email    :      {type: String, required: true,unique: true},
    password :      {type: String, required: true},
    status   :      {type: Boolean, required: false, default: 1},
    role_id  :      {type: mongoose.Schema.Types.ObjectId, ref: 'roles', required: false}

},{
    versionKey: false,
    timestamps: true
});


// schema.methods.toJSON = function (){
//     const user = this
//     const userObject = user.toObject()
//     delete userObject.password
//     delete userObject.tokens
//     return userObject
// }

schema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const userCreate = mongoose.model("userCreation", schema);
module.exports = userCreate;