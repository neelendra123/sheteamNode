const mongoose = require('mongoose');
const validator = require('validator');
var schema = mongoose.Schema({
   
    complaint_name          :     {type:String, required: true},
    case_type               :     {type:mongoose.Schema.Types.ObjectId, ref : "Dropdown"},
    section                 :     {type:Number, required: false},
    police_station          :     {type:String, required: false},
    name_of_policeteam      :     {type:String, required: false},
    case_report             :     {type:String, required: false},
    case_status               :     {type:mongoose.Schema.Types.ObjectId, ref : "Dropdown"},
    accused_id :                [{type:mongoose.Schema.Types.ObjectId, ref : 'accused'}] ,
    status                  :     {type: Boolean, required: false, default: 1}

},{
    versionKey: false,
    timestamps: true
});

const cases = mongoose.model("Cases", schema);
module.exports = cases;