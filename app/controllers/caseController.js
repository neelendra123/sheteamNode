const {to} = require('../middlewares/utilservices');
var express = require('express');
const case1 = require('../services/caseService');
module.exports = {
    createCase :async function(req, res){
        let err, data;
    
        [err, data]= await to(case1.createCase(req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    displayCase: async function(req,res){
        let err, data;
        [err, data]= await to(case1.displayCases(req.params.role_id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    updateCases: async function(req, res){
        let err, data;
        [err, data] = await to(case1.updateCase(req.params.id, req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    deleteCase : async function(req, res){
        let err,data;
        [err, data] = await to(case1.deleteCase(req.params.id))
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});
        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
      },
      displayoneCase :  async function(req,res){
        let err, data;
        [err, data]= await to(case1.getOneCase(req.params.id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    displayAccusedfromCase : async function(req,res){
        let err, data;
        [err, data]= await to(case1.displayAccusedfromCase(req.params.id));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    exportCases : async function(req,res){
        let err, data;
        [err, data]= await to(case1.exportCasesData());
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    filterDropdown : async function(req, res){
        let err, data;
       
        [err, data] = await to(case1.dropdownFilters(req.query, req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },
    multiSelectCasesInfo : async function(req, res){
        let err, data;
       
        [err, data] = await to(case1.multiSelectCasesInfo(req.query, req.body));
    
        if(err) return res.status(500).json({"status": 500,"success": false,"message": err.message});

        if(data && data!==false){
            return res.status(200).json({"status": 200,"success": true,"data": data});
        }else{
            return res.status(401).json({"status": 401,"success": false,"message": "Failed. Try again"});
        }
    },

}
