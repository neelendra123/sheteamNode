const {to} = require('../middlewares/utilservices');
var formDataService = require('../services/formDataService');
module.exports = {
    createFormData : async function(req, res){
        let err, data;
    
        [err, data]= await to(formDataService.createFormData(req.body));
        
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    displayFormData : async function(req,res){
        let err, data;
        [err, data]= await to(formDataService.displayFormData());
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    }
}