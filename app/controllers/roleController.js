const {to} = require('../middlewares/utilservices');
var express = require('express');
var roleService = require('../services/roleService');
module.exports = {
    createRole :async function(req, res){
        let err, data;
    
        [err, data]= await to(roleService.createRole(req.params,req.body));
        
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    displayRoles: async function(req,res){
        let err, data;
        [err, data]= await to(roleService.displayRole());
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    updateRole: async function(req, res){
        let err, data;
        [err, data] = await to(roleService.updateRole(req.params.id, req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    deleteRoles : async function(req, res){
        let err,data;
        [err, data] = await to(roleService.deleteRole(req.params.id))
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});
        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
      },
      getOneRole :  async function(req,res){
        let err, data;
        [err, data]= await to(roleService.getOneRole(req.params.id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    getUserRoles :  async function(req,res){
        let err, data;
        [err, data]= await to(roleService.getUserRoles(req.params.id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    getOneRoleByUser : async function(req,res){
        let err, data;
        [err, data]= await to(roleService.getOneRoleByUser(req.params.id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    }
}