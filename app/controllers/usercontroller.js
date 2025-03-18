const {to} = require('../middlewares/utilservices');
var express = require('express');
var usercreateService = require('../services/userservice');
module.exports = {
    createUser :async function(req, res){
        let err, data;
    
        [err, data]= await to(usercreateService.createUser(req.body));
        
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    displayUsers : async function(req,res){
        let err, data;
        [err, data]= await to(usercreateService.displayUsers(req.params.role_id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    displayOneUser :  async function(req,res){
        let err, data;
        [err, data]= await to(usercreateService.getOneUser(req.params.id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    updateUser: async function(req, res){
        let err, data;
        [err, data] = await to(usercreateService.updateUserCreation(req.params.id, req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },

    userLogin :async function(req, res){
        let err, data;
        //console.log(req.body)
        [err, data]= await to(usercreateService.userLogin(req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },

    deleteUser : async function(req, res){
        let err,data;
        [err, data] = await to(usercreateService.deleteUser(req.params.id))
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});
    
        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
      },
      
     passwordUpdate: async function(req, res){
        let err, data;
        [err, data] = await to(usercreateService.passwordUpdate(req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
}