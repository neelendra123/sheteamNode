const {to} = require('../middlewares/utilservices');
var express = require('express');
const dropdown = require('../services/dropDownService');
module.exports = {
    createDropdown :async function(req, res){
        let err, data;
    
        [err, data]= await to(dropdown.createDropdown(req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    displayDropdown: async function(req,res){
        let err, data;
        [err, data]= await to(dropdown.displayDropdown(req.params.role_id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    updateDropdown: async function(req, res){
        let err, data;
        [err, data] = await to(dropdown.updateDropdown(req.params.id, req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    deleteDropdown : async function(req, res){
        let err,data;
        [err, data] = await to(dropdown.deleteDropdown(req.params.id))
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});
        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
      },
      displayoneDropdown :  async function(req,res){
        let err, data;
        [err, data]= await to(dropdown.getOneDropdown(req.params.id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    filterDropdown : async function(req,res){
        let err, data;
        [err, data]= await to(dropdown.dropdownFilter());
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    filterDropdown2 : async function(req,res){
        let err, data;
        [err, data]= await to(dropdown.dropdownFilter2());
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    }
}
