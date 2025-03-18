const mongoose = require('mongoose');
var schema = mongoose.Schema({
   
    city          :      {type:String, required: true},
    dist_id     :        {type:mongoose.Schema.Types.ObjectId, ref : 'district'},
    status        :      {type: Boolean, required: false, default: 1}

},{
    versionKey: false,
    timestamps: true
});

const City = mongoose.model("City", schema);
module.exports = City;