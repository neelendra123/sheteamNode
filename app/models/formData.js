const mongoose = require('mongoose');
var schema = mongoose.Schema({
    formData : [],
    status        :      {type: Boolean, required: false, default: 1}

},{
    versionKey: false,
    timestamps: true
});

const formData = mongoose.model("formdata", schema);
module.exports = formData;