const {to,TE} = require('../middlewares/utilservices');
const userCreation = require('../models/users');
const permission = require('../models/roles');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
    createUser : async function(payload){
         let err,data;
         let user = await userCreation.findOne({email:payload.email} );
        //  console.log(user);
         if (user) {
            TE('user already exists with email!');
         }

         else{
            data = new userCreation({
               name :  payload.name,
               username : payload.username,
                email     : payload.email,
                password :  payload.password,
                status    : payload.hasOwnProperty('status') ? payload.status : 1,
                role_id  : payload.role_id
            });
           // console.log(data);
            let newuserCreation;
            [err, newuserCreation]= await to(data.save());
    
            if(err)
            // TE('please fill require fileds i.e, name, username,etc...!')
              {TE(err, true);}
    
            if(newuserCreation){
                return newuserCreation;
            }else{
                return false;
            }

         }
         
     },
     displayUsers : async function(role_id){
        let err, data, permissions;
        [err,permissions] = await to(permission.find({'_id' : role_id}));
        [err, data] = await to(userCreation.find({}).populate('role_id',['_id','role_name']));
        if(err) {TE(err, true);}

        if(data){
            return {data : data, permissions: permissions[0].users};
        }else{
            return false;
        }
    },

    updateUserCreation : async function(id, payload){
        let data, err, updatedData;
        // console.log(id);
        
        data = await userCreation.findById(id);
        // console.log(data);
        if(err) {TE(err, true);}

        if(data){
            data.name =  payload.hasOwnProperty('name') ? payload.name :  data.name;
            data.username =  payload.hasOwnProperty('username') ? payload.username :  data.username;
            data.email     =payload.hasOwnProperty('email') ? payload.email :  data.email;
            data.role_id =  payload.hasOwnProperty('role_id') ? payload.role_id :  data.role_id;
            data.status    = payload.hasOwnProperty('status') ? payload.status : data.status;
            [err, updatedData] = await to(data.save());
            if(err) {TE(err,true);}

            [err, allUsers] = await to(userCreation.find({}));
            // console.log(allUsers);
            if(err) {TE(err, true);}

            return allUsers;
        }else{
            return TE("Unable to update User details!");
        }
    },
    userLogin : async function(payload){
        let token;
        const user = await userCreation.find({email:payload.email}).populate('role_id',['_id','role_name']);
        const pwd = user[0].password;    
        if(!user){
            throw new Error('Email Not exists Please Signup!')
        }
        const isMatch = await bcrypt.compare(payload.password,pwd)
        
        if(!isMatch){
            throw new Error('Unable to login')
        }

        else{
            //console.log(process.env.JWT_ENCRYPTION)
            token = "Bearer " + jwt.sign(user[0].toJSON(),
            "5876E8aZX7f6b0Rd72eA7185dC08als8hh2y",
            {expiresIn : "24h"}
          
            ) 
    
        }
        return {user,token}
    
    },
    getOneUser : async function(id){
        let data,err;
        [err, data]= await to(userCreation.findById(id).populate('role_id',['role_name','_id']));
        if(err) {TE(err, true);}
        if(data){
            return data;
        }else{
            return false;
        }
    },

    deleteUser: async function(id){
        let data,err;
        [err,data] = await to(userCreation.findByIdAndDelete(id))
        if(err) {TE(err, true);}
        [err, allUsers] = await to(userCreation.find({}).populate('role_id',['_id','role_name']));
        if(err) {TE(err, true);}

        return allUsers;
     },

     passwordUpdate : async function(payload){
        let err,data;

        data = await userCreation.findOne({email : payload.email});
        // console.log(data);
        if(err) {TE(err, true);}
        if(data){
            data.password =  payload.hasOwnProperty('password') ? payload.password :  data.password;
            [err, updatedData] = await to(data.save());
            if(err) {TE(err,true);}
            [err, allUsers] = await to(userCreation.find({}));
            // console.log(allUsers);
            if(err) {TE(err, true);}

            return allUsers;
        }else{
            return TE("Unable to update User Password!");
        }
     
    
     }

    }