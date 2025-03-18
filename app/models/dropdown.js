const mongoose = require('mongoose');
var schema = mongoose.Schema({
   
    value          :      {type:String, required: true},
    DropdownType     :     {type:String, required: true},
    status        :      {type: Boolean, required: false, default: 1}

},{
    versionKey: false,
    timestamps: true
});

const Dropdown = mongoose.model("Dropdown", schema);
module.exports = Dropdown;