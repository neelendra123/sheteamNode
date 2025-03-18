const {to} = require('../middlewares/utilservices');
var express = require('express');
const districts = require('../services/districtService');
module.exports = {
    createUser :async function(req, res){
        let err, data;
    
        [err, data]= await to(districts.createDistrict(req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    displayDistricts : async function(req,res){
        let err, data;
        [err, data]= await to(districts.displayDistricts(req.params.role_id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    updateDistrict: async function(req, res){
        let err, data;
        [err, data] = await to(districts.updateDistrict(req.params.id, req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    deleteDistrict : async function(req, res){
        let err,data;
        [err, data] = await to(districts.deleteDistrict(req.params.id))
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});
        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
      },
      displayOneDistrict :  async function(req,res){
        let err, data;
        [err, data]= await to(districts.getOneDistrict(req.params.id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    getDistricts : async function(req,res){
        let err, data;
        [err, data]= await to(districts.getDistricts());
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    }

}
