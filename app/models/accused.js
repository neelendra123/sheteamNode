const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require("bcryptjs");

var schema = mongoose.Schema({
   
    name        :      {type:String, required: true},
    father_name :      {type:String, required: true},
    age         :      {type: Number, required: true},
    district    :      {type:mongoose.Schema.Types.ObjectId, ref : "district"},
    city        :      {type:mongoose.Schema.Types.ObjectId, ref : "City"},
    profession  :      {type: String, required: true},
    address     :      {type: String, required: true},
    contact     :      {type: String, required: true},
    case_id     :       {type:mongoose.Schema.Types.ObjectId, ref : 'Cases'}


},{
    versionKey: false,
    timestamps: true
});

const accused = mongoose.model("accused", schema);
module.exports = accused;