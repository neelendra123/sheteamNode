const {to,TE} = require('../middlewares/utilservices');
const Dropdown = require('../models/dropdown');
const permission = require('../models/roles');
module.exports = {
    createDropdown : async function(payload){
        let err,dropdown;
        let dropdown1 = await Dropdown.findOne({value: payload.value});
        if(dropdown1){
            TE('value already exists!');
        }
        dropdown = new Dropdown({
            value : payload.value,
            DropdownType : payload.DropdownType,
            status : payload.hasOwnProperty('status') ? payload.status : 1
        });
        let newDropdown;
        [err, newDropdown]= await to(dropdown.save());

        if(err) 
        TE('Please Enter Data Properly');
        // {TE(err, true);}

        if(newDropdown){
            return newDropdown;
        }else{
            return false;
        }
    },
    displayDropdown : async function(role_id){
        let err, data, permissions;
        [err,permissions] = await to(permission.find({'_id' : role_id}));
        // console.log(permissions);
        [err, data]= await to(Dropdown.find({}));
        if(err) {TE(err, true);}

        if(data){
            return {data: data, permissions : permissions[0].dropdowns };
        }else{
            return false;
        }
    },
    updateDropdown : async function(id, payload){
        let data, err, updatedData;
        // console.log(id);
        
        data = await Dropdown.findById(id);
        // console.log(data);
        if(err) {TE(err, true);}

        if(data){
          
            data.value =  payload.hasOwnProperty('value') ? payload.value :  data.value;
            data.DropdownType =  payload.hasOwnProperty('DropdownType') ? payload.DropdownType : data.DropdownType;
            data.status    = payload.hasOwnProperty('status') ? payload.status : 1;
            [err, updatedData] = await to(data.save());
            if(err) {TE(err, true);}

            [err, allDropdowns] = await to(Dropdown.find({}));
            console.log(allDropdowns);
            if(err) {TE(err, true);}

            return allDropdowns;
        }else{
            return TE("Unable to update dropdown details!");
        }
    },
    deleteDropdown: async function(id){
        let data,err;
        [err,data] = await to(Dropdown.findByIdAndDelete(id))
        if(err) {TE(err, true);}
        [err, allDropdowns] = await to(Dropdown.find({}));
        if(err) {TE(err, true);}

        return allDropdowns;
     },
     getOneDropdown : async function(id){
        let data,err;
        [err, data]= await to(Dropdown.findById(id));
        if(err) {TE(err, true);}
        if(data){
            return data;
        }else{
            return false;
        }
    },

    dropdownFilter : async function(){
        let caseType,err;
        [err, caseType] = await to(Dropdown.find({DropdownType : 'Case Type'}));
        if(err) {TE(err, true);}
        if(caseType){
            return caseType;
        }
        else{
            return false;
        }
        
    },
    dropdownFilter2 : async function(){
        let caseStatus,err;
        [err, caseStatus] = await to(Dropdown.find({DropdownType : 'Case Status'}));
        if(err) {TE(err, true);}
        if(caseStatus){
            return caseStatus;
        }
        else{
            return false;
        }
        
    },
}