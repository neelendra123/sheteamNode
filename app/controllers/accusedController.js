const {to} = require('../middlewares/utilservices');
var express = require('express');
var accusedService = require('../services/accusedService');
module.exports = {
    createAccused :async function(req, res){
        let err, data;
    
        [err, data]= await to(accusedService.createAccused(req.body));
        
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },

    displayAccuses : async function(req, res){
        let err, data;
    
        [err, data]= await to(accusedService.displayAccused(req.params.role_id));
        
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    updateAccused: async function(req, res){
        let err, data;
        [err, data] = await to(accusedService.updateAccused(req.params.id, req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    deleteAccused : async function(req, res){
        let err,data;
        [err, data] = await to(accusedService.deleteAccused(req.params.id))
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});
        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
      }, 
      displayoneAccused :  async function(req,res){
        let err, data;
        [err, data]= await to(accusedService.getOneAccuse(req.params.id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    importFile :  async function(req,res){
        let err,data;
        [err,data] = await to(accusedService.importFile(req.body,req.file,req.file.path));
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});
     
        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    }
}