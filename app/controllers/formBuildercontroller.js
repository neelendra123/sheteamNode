const {to} = require('../middlewares/utilservices');
var formBuilderService = require('../services/customFormService');
module.exports = {
    createField : async function(req, res){
        let err, data;
    
        [err, data]= await to(formBuilderService.createField(req.body));
        
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    displayFields : async function(req, res){
        let err, data;
    
        [err, data]= await to(formBuilderService.displayFileds());
        
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    displayOneFeild : async function(req, res){
        let err, data;
    
        [err, data]= await to(formBuilderService.displayOneFeild(req.params.id));
        
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    updateFormField: async function(req, res){
        let err, data;
        [err, data] = await to(formBuilderService.updateFormField(req.params.id, req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
}