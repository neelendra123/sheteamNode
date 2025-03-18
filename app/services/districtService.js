const {to,TE} = require('../middlewares/utilservices');
const districts = require('../models/districts');
const permission = require('../models/roles');
module.exports = {
    createDistrict : async function(payload){
        let err,district;
        let district1 = await districts.findOne({dist_name:payload.dist_name});
        console.log(district1);
        if(district1){
            TE('District already exists!')
        }
        district = new districts({
            dist_name : payload.dist_name,
            formName : payload.formName,
            // InputForm : payload.InputForm,
            status : payload.hasOwnProperty('status') ? payload.status : 1
        });
        let newDistrict;
        [err, newDistrict]= await to(district.save());

        if(err) {TE(err, true);}

        if(newDistrict){
            return newDistrict;
        }else{
            return false;
        }
    },
    displayDistricts : async function(role_id){
        let err, data,permissions;
        [err,permissions] = await to(permission.find({'_id' : role_id}));;
        [err, data]= await to(districts.find({}).populate('formName'));
        if(err) {TE(err, true);}

        if(data){
            return {data : data, permissions : permissions[0].district};
        }else{
            return false;
        }
    },
    updateDistrict : async function(id, payload){
        let data, err, updatedData;
        // console.log(id);
        
        data = await districts.findById(id);
        // console.log(data);
        if(err) {TE(err, true);}

        if(data){
          
            data.dist_name =  payload.hasOwnProperty('dist_name') ? payload.dist_name :  data.dist_name;
            data.formName =  payload.hasOwnProperty('formName') ? payload.formName :  data.formName;
            // data.InputForm = payload.hasOwnProperty('InputForm') ? payload.formName :  data.formName;
            data.status    = payload.hasOwnProperty('status') ? payload.status : 1;
            [err, updatedData] = await to(data.save());
            if(err) {TE(err, true);}

            [err, allDistricts] = await to(districts.find({}));
            console.log(allDistricts);
            if(err) {TE(err, true);}

            return allDistricts;
        }else{
            return TE("Unable to update district details!");
        }
    },
    deleteDistrict: async function(id){
        let data,err;
        [err,data] = await to(districts.findByIdAndDelete(id))
        if(err) {TE(err, true);}
        [err, allDistricts] = await to(districts.find({}));
        if(err) {TE(err, true);}

        return allDistricts;
     },
     getOneDistrict : async function(id){
        let data,err;
        [err, data]= await to(districts.findById(id).populate('formName'));
      
        if(err) {TE(err, true);}
        if(data){
            return data;
        }else{
            return false;
        }
    },
    getDistricts : async function(){
        let err, data;
        [err, data]= await to(districts.find({}));
        if(err) {TE(err, true);}
        if(data){
            return data;
        }else{
            return false;
        }
    },
}