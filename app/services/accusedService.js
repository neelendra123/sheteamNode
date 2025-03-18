const {to,TE} = require('../middlewares/utilservices');
const accused = require('../models/accused');
const permission = require('../models/roles');
var xlsx = require('xlsx');
module.exports = {
    createAccused : async function(payload){
         let err,data;
         let duplicateAccused = await accused.findOne({contact : payload.contact});
         if(duplicateAccused){
             TE('Accused Already Filed!');
         }
            data = new accused({
               name :  payload.name,
               father_name : payload.father_name,
                age         :  payload.age,
                district    :     payload.district,
                city        :      payload.city,
                profession  :      payload.profession,
                address : payload.address,
                contact     :      payload.contact,
                case_id : payload.case_id,
                status    : payload.hasOwnProperty('status') ? payload.status : 1
            });
          
            let newAccused;
            [err, newAccused]= await to(data.save());
    
            if(err)
           
              {TE(err, true);}
    
            if(newAccused){
                return newAccused;
            }else{
                return false;
            }

         },

         displayAccused : async function(role_id){
            let err, data, permissions;
            [err,permissions] = await to(permission.find({'_id' : role_id}));;
            [err, data]= await to(accused.find({}).populate(['district','city']));
            
            if(err) {TE(err, true);}
            
            if(data){
                return {data : data, permissions : permissions[0].accused};
            }else{
                return false;
            }
         },
         updateAccused : async function(id, payload){
            let data, err, updatedData;
            // console.log(id);
            
            data = await accused.findById(id);
            // console.log(data);
            if(err) {TE(err, true);}
            if(data){
                data.name =  payload.hasOwnProperty('name') ? payload.name :  data.name;
                data.father_name =  payload.hasOwnProperty('father_name') ? payload.father_name :  data.father_name;
                data.age     =payload.hasOwnProperty('age') ? payload.age :  data.age;
                data.district =  payload.hasOwnProperty('district') ? payload.district :  data.district;
                data.city =  payload.hasOwnProperty('city') ? payload.city :  data.city;
                data.profession =  payload.hasOwnProperty('profession') ? payload.profession :  data.profession;
                data.address = payload.hasOwnProperty('address') ? payload.address :  data.address;
                data.contact =  payload.hasOwnProperty('contact') ? payload.contact :  data.contact;
                data.case_id = payload.hasOwnProperty('case_id') ? payload.case_id :  data.case_id;
                data.status    = payload.hasOwnProperty('status') ? payload.status : data.status;
                [err, updatedData] = await to(data.save());
                if(err) {TE(err,true);}
    
                [err, allAccuses] = await to(accused.find({}));
               
                if(err) {TE(err, true);}
    
                return data;
            }else{
                return TE("Unable to update accused details!");
            }
        },

        deleteAccused  : async function(id){
            let err,data;
            [err,data] = await to(accused.findByIdAndDelete(id));
            if(err) {TE(err, true);}
            [err, allAccuses] = await to(accused.find({}).populate(['district','city']));
            if(err) {TE(err, true);}
    
            return allAccuses;
         },
         getOneAccuse : async function(id){
            let data,err;
            [err, data]= await to(accused.findById(id).populate(['district','city','case_id']));
          
            if(err) {TE(err, true);}
            if(data){
                return data;
            }else{
                return false;
            }
        },

        importFile : async function(payload, file, obj){
            let err,newFile;
            let workbook = xlsx.readFile(obj);
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            let jsonArray2 = [];
            jsonArray2 = xlsx.utils.sheet_to_json(worksheet);
            [err,newFile] = await to(accused.insertMany(jsonArray2));
            if(err) {TE(err.message, true);}

            if(newFile){
                 return newFile;
            }else{
                 return false;
            }
        }
     }