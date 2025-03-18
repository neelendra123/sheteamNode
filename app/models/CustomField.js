const mongoose = require('mongoose');

var schema = mongoose.Schema({
   
    form_name          :      {type:String, required: true},
    formData            :       [],
    status             :      {type: Boolean, required: false, default: 1}

},{
    versionKey: false,
    timestamps: true
});

const customForm = mongoose.model("customform", schema);
module.exports = customForm;
