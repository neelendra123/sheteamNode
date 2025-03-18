const mongoose = require('mongoose');
var schema = mongoose.Schema({
    dist_name     :      {type:String, required: true},
    formName      : {type: mongoose.Schema.Types.ObjectId, ref: 'customform', required: false},
    // InputForm    : [],
    status        :      {type: Boolean, required: false, default: 1}

},{
    versionKey: false,
    timestamps: true
});

const district = mongoose.model("district", schema);
module.exports = district;