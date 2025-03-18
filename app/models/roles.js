const mongoose = require('mongoose');
var schema = mongoose.Schema({
   
    role_name          :      {type:String, required: true},
    status        :      {type: Boolean, required: false, default: 1},
    select_all:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "select_all", required: false}
    },
    dashboard:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 1, required: false},
        parent        : {type: String, default: "dashboard", required: false}
    },
    cases:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 1, required: false},
        parent        : {type: String, default: "cases", required: false}
    },
    addCase:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "cases", required: false}
    },
    searchCase:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "cases", required: false}
    },
    accused:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "cases", required: false}
    },
    management:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 1, required: false},
        parent        : {type: String, default: "management", required: false}
    },
    users:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "management", required: false}
    },
    permissions:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "management", required: false}
    },
    locations:{
      canCreate     : {type: Boolean, default: 0, required: false},
      canView       : {type: Boolean, default: 0, required: false},
      canUpdate     : {type: Boolean, default: 0, required: false},
      canDelete     : {type: Boolean, default: 0, required: false},
      isMenu        : {type: Boolean, default: 1, required: false},
      parent        : {type: String, default: "locations", required: false}
    },
    district:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "locations", required: false}
    },
    city:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "locations", required: false}
    },
    extras:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 1, required: false},
        parent        : {type: String, default: "extras", required: false}
    },
    dropdowns:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "extras", required: false}
    },
    contactUs:{
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "extras", required: false}
    },
    customforms: {
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 1, required: false},
        parent        : {type: String, default: "customforms", required: false}
    },
    addforms: {
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "customforms", required: false}
    },
    useforms: {
        canCreate     : {type: Boolean, default: 0, required: false},
        canView       : {type: Boolean, default: 0, required: false},
        canUpdate     : {type: Boolean, default: 0, required: false},
        canDelete     : {type: Boolean, default: 0, required: false},
        isMenu        : {type: Boolean, default: 0, required: false},
        parent        : {type: String, default: "customforms", required: false}
    },
    createdBy     : {type: mongoose.Schema.Types.ObjectId, ref: 'userCreation', required: false}


},{
    versionKey: false,
    timestamps: true
});

const role = mongoose.model("roles", schema);
module.exports = role;