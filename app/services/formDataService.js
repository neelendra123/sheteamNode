const {to,TE} = require('../middlewares/utilservices');
const formDataModel = require('../models/formData');
module.exports = {
    createFormData : async function(payload){
        let err,data;
        data = new formDataModel({
            formData : payload.formData,
            status : payload.hasOwnProperty('status') ? payload.status : 1
        });
        let newFormData;
        [err, newFormData]= await to(data.save());

        if(err) {TE(err, true);}

        if(newFormData){
            return newFormData;
        }else{
            return false;
        }
    },
    displayFormData : async function(){
        let err, data;
        [err, data]= await to(formDataModel.find({}));
        if(err) {TE(err, true);}

        if(data){
            return data;
        }else{
            return false;
        }

    }
}