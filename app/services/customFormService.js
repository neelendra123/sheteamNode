const {to,TE} = require('../middlewares/utilservices');
const CustomForm = require('../models/CustomField');

module.exports = {
    createField : async function(payload){
        let err,data;
       let duplicateFeild = await CustomForm.findOne({form_name : payload.form_name});
        if(duplicateFeild){
            TE(`Custom Form with name ${payload.form_name} is already exists!`);
        }
        data = new CustomForm({
            form_name          :     payload.form_name,
            formData           :     payload.formData,
            status              :    payload.hasOwnProperty('status') ? payload.status : 1
        });
        let newForm;
            [err, newForm]= await to(data.save());
    
            if(err)
              {TE(err, true);}
    
            if(newForm){
                return newForm;
            }else{
                return false;
            }

    },
    displayFileds : async function(){
        let err, data;
        [err,data] = await to(CustomForm.find({}));
        if(err) {TE(err, true);}
        if(data){
            return data;
        }else{
            return false;
        }
    },
    displayOneFeild : async function(id){
        let data,err;
        [err, data]= await to(CustomForm.findById(id));
        if(err) {TE(err, true);}
        if(data){
            return data;
        }else{
            return false;
        }
    },
    updateFormField : async function(id, payload){
        let data, err, updatedData;
        data = await CustomForm.findById(id);
        if(err) {TE(err, true);}
        if(data){
            data.form_name = payload.hasOwnProperty('form_name') ? payload.form_name :  data.form_name;
            data.formData = payload.hasOwnProperty('formData') ? payload.formData :  data.formData;
            data.status    = payload.hasOwnProperty('status') ? payload.status : 1;
            [err, updatedData] = await to(data.save());

            if (err) { TE(err, true); }

            [err, allForms] = await to(CustomForm.find({}));
            // console.log(allCases);
            if (err) { TE(err, true); }

            return allForms;
        }
        else{
            return TE("Unable to update city details!");
        }
        
    }
}