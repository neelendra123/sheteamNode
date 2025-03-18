const express = require('express');
const {to,TE} = require('../middlewares/utilservices');
const Role = require('../models/roles');
const Users = require('../models/users');
module.exports = {
    createRole : async function(userId,payload){
        // console.log(userId);
        let err,data,duplicateData;
        duplicateData = await Role.findOne({ role_name: payload.role_name });
        if (duplicateData) {
            { TE("User Role exists") };
        }
            data = new Role ({
                    role_name: payload.role_name,
                    createdBy: userId.userid,
                    select_all: payload.hasOwnProperty("select_all") ? {
                        canCreate: payload.select_all.canCreate ? payload.select_all.canCreate : 0,
                        canView: payload.select_all.canView ? payload.select_all.canView : 0,
                        canUpdate: payload.select_all.canUpdate ? payload.select_all.canUpdate : 0,
                        canDelete: payload.select_all.canDelete ? payload.select_all.canDelete : 0
                    } : 0,
                    dashboard: payload.hasOwnProperty("dashboard") ? {
                        canCreate: payload.dashboard.canCreate ? payload.dashboard.canCreate : 0,
                        canView: payload.dashboard.canView ? payload.dashboard.canView : 0,
                        canUpdate: payload.dashboard.canUpdate ? payload.dashboard.canUpdate : 0,
                        canDelete: payload.dashboard.canDelete ? payload.dashboard.canDelete : 0
                    } : 0,
                    cases: payload.hasOwnProperty("cases") ? {
                        canCreate: payload.cases.canCreate ? payload.cases.canCreate : 0,
                        canView: payload.cases.canView ? payload.cases.canView : 0,
                        canUpdate: payload.cases.canUpdate ? payload.cases.canUpdate : 0,
                        canDelete: payload.cases.canDelete ? payload.cases.canDelete : 0
                    } : 0,
                    addCase: payload.hasOwnProperty("addCase") ? {
                        canCreate: payload.addCase.canCreate ? payload.addCase.canCreate : 0,
                        canView: payload.addCase.canView ? payload.addCase.canView : 0,
                        canUpdate: payload.addCase.canUpdate ? payload.addCase.canUpdate : 0,
                        canDelete: payload.addCase.canDelete ? payload.addCase.canDelete : 0
                    } : 0,
                    searchCase: payload.hasOwnProperty("searchCase") ? {
                        canCreate: payload.searchCase.canCreate ? payload.searchCase.canCreate : 0,
                        canView: payload.searchCase.canView ? payload.searchCase.canView : 0,
                        canUpdate: payload.searchCase.canUpdate ? payload.searchCase.canUpdate : 0,
                        canDelete: payload.searchCase.canDelete ? payload.searchCase.canDelete : 0
                    } : 0,
                    accused: payload.hasOwnProperty("accused") ? {
                        canCreate: payload.accused.canCreate ? payload.accused.canCreate : 0,
                        canView: payload.accused.canView ? payload.accused.canView : 0,
                        canUpdate: payload.accused.canUpdate ? payload.accused.canUpdate : 0,
                        canDelete: payload.accused.canDelete ? payload.accused.canDelete : 0
                    } : 0,
                    management: payload.hasOwnProperty("management") ? {
                        canCreate: payload.management.canCreate ? payload.management.canCreate : 0,
                        canView: payload.management.canView ? payload.management.canView : 0,
                        canUpdate: payload.management.canUpdate ? payload.management.canUpdate : 0,
                        canDelete: payload.management.canDelete ? payload.management.canDelete : 0
                    } : 0,
                    users: payload.hasOwnProperty("users") ? {
                        canCreate: payload.users.canCreate ? payload.users.canCreate : 0,
                        canView: payload.users.canView ? payload.users.canView : 0,
                        canUpdate: payload.users.canUpdate ? payload.users.canUpdate : 0,
                        canDelete: payload.users.canDelete ? payload.users.canDelete : 0
                    } : 0,
                    permissions: payload.hasOwnProperty("permissions") ? {
                        canCreate: payload.permissions.canCreate ? payload.permissions.canCreate : 0,
                        canView: payload.permissions.canView ? payload.permissions.canView : 0,
                        canUpdate: payload.permissions.canUpdate ? payload.permissions.canUpdate : 0,
                        canDelete: payload.permissions.canDelete ? payload.permissions.canDelete : 0
                    } : 0,
                    locations: payload.hasOwnProperty("locations") ? {
                        canCreate: payload.locations.canCreate ? payload.locations.canCreate : 0,
                        canView: payload.locations.canView ? payload.locations.canView : 0,
                        canUpdate: payload.locations.canUpdate ? payload.locations.canUpdate : 0,
                        canDelete: payload.locations.canDelete ? payload.locations.canDelete : 0
                    } : 0,
                    district: payload.hasOwnProperty("district") ? {
                        canCreate: payload.district.canCreate ? payload.district.canCreate : 0,
                        canView: payload.district.canView ? payload.district.canView : 0,
                        canUpdate: payload.district.canUpdate ? payload.district.canUpdate : 0,
                        canDelete: payload.district.canDelete ? payload.district.canDelete : 0
                    } : 0,
                    city: payload.hasOwnProperty("city") ? {
                        canCreate: payload.city.canCreate ? payload.city.canCreate : 0,
                        canView: payload.city.canView ? payload.city.canView : 0,
                        canUpdate: payload.city.canUpdate ? payload.city.canUpdate : 0,
                        canDelete: payload.city.canDelete ? payload.city.canDelete : 0
                    } : 0,
                    extras: payload.hasOwnProperty("extras") ? {
                        canCreate: payload.extras.canCreate ? payload.extras.canCreate : 0,
                        canView: payload.extras.canView ? payload.extras.canView : 0,
                        canUpdate: payload.extras.canUpdate ? payload.extras.canUpdate : 0,
                        canDelete: payload.extras.canDelete ? payload.extras.canDelete : 0
                    } : 0,
                    dropdowns: payload.hasOwnProperty("dropdowns") ? {
                        canCreate: payload.dropdowns.canCreate ? payload.dropdowns.canCreate : 0,
                        canView: payload.dropdowns.canView ? payload.dropdowns.canView : 0,
                        canUpdate: payload.dropdowns.canUpdate ? payload.dropdowns.canUpdate : 0,
                        canDelete: payload.dropdowns.canDelete ? payload.dropdowns.canDelete : 0
                    } : 0,
                    contactUs: payload.hasOwnProperty("contactUs") ? {
                        canCreate: payload.contactUs.canCreate ? payload.contactUs.canCreate : 0,
                        canView: payload.contactUs.canView ? payload.contactUs.canView : 0,
                        canUpdate: payload.contactUs.canUpdate ? payload.contactUs.canUpdate : 0,
                        canDelete: payload.contactUs.canDelete ? payload.contactUs.canDelete : 0
                    } : 0,
                    customforms: payload.hasOwnProperty("customforms") ? {
                        canCreate: payload.customforms.canCreate ? payload.customforms.canCreate : 0,
                        canView: payload.customforms.canView ? payload.customforms.canView : 0,
                        canUpdate: payload.customforms.canUpdate ? payload.customforms.canUpdate : 0,
                        canDelete: payload.customforms.canDelete ? payload.customforms.canDelete : 0
                    } : 0,
                    addforms: payload.hasOwnProperty("addforms") ? {
                        canCreate: payload.addforms.canCreate ? payload.addforms.canCreate : 0,
                        canView: payload.addforms.canView ? payload.addforms.canView : 0,
                        canUpdate: payload.addforms.canUpdate ? payload.addforms.canUpdate : 0,
                        canDelete: payload.addforms.canDelete ? payload.addforms.canDelete : 0
                    } : 0,
                    useforms: payload.hasOwnProperty("useforms") ? {
                        canCreate: payload.useforms.canCreate ? payload.useforms.canCreate : 0,
                        canView: payload.useforms.canView ? payload.useforms.canView : 0,
                        canUpdate: payload.useforms.canUpdate ? payload.useforms.canUpdate : 0,
                        canDelete: payload.useforms.canDelete ? payload.useforms.canDelete : 0
                    } : 0,
                });
                // console.log(data);
                let newRole;
                [err, newRole]= await to(data.save());
        
                if(err)
               
                  {TE(err, true);}
        
                if(newRole){
                    return newRole;
                }else{
                    return false;
                }
                      
        
    } ,
    displayRole : async function(){
        let err,data;
        [err,data] = await to(Role.find({}).populate('createdBy',['name','username']));
        if(err) {TE(err, true);}
        if(data){
            return data;
        }
        else{
            return false;
        }
    },
    updateRole : async function (roleId, payload) {
        let err, permissionData, data;
        [err, permissionData] = await to(Role.findById(roleId));
        if (err) { TE(err.message, true); }

        if (permissionData) {
            permissionData.role_name = payload.role_name ? payload.role_name : permissionData.role_name;
            permissionData.status = payload.status ? payload.status : permissionData.status;

            if (payload.hasOwnProperty("select_all")) {
                permissionData.select_all.canCreate = payload.select_all.canCreate;
                permissionData.select_all.canView = payload.select_all.canView;
                permissionData.select_all.canUpdate = payload.select_all.canUpdate;
                permissionData.select_all.canDelete = payload.select_all.canDelete;
            }
            if (payload.hasOwnProperty("dashboard")) {
                permissionData.dashboard.canCreate = payload.dashboard.canCreate;
                permissionData.dashboard.canView = payload.dashboard.canView;
                permissionData.dashboard.canUpdate = payload.dashboard.canUpdate;
                permissionData.dashboard.canDelete = payload.dashboard.canDelete;
            }
            if (payload.hasOwnProperty("cases")) {
                permissionData.cases.canCreate = payload.cases.canCreate;
                permissionData.cases.canView = payload.cases.canView;
                permissionData.cases.canUpdate = payload.cases.canUpdate;
                permissionData.cases.canDelete = payload.cases.canDelete;
            }

            if (payload.hasOwnProperty("addCase")) {
                permissionData.addCase.canCreate = payload.addCase.canCreate;
                permissionData.addCase.canView = payload.addCase.canView;
                permissionData.addCase.canUpdate = payload.addCase.canUpdate;
                permissionData.addCase.canDelete = payload.addCase.canDelete;
            }
            if (payload.hasOwnProperty("searchCase")) {
                permissionData.searchCase.canCreate = payload.searchCase.canCreate;
                permissionData.searchCase.canView = payload.searchCase.canView;
                permissionData.searchCase.canUpdate = payload.searchCase.canUpdate;
                permissionData.searchCase.canDelete = payload.searchCase.canDelete;
            }
            if (payload.hasOwnProperty("accused")) {
                permissionData.accused.canCreate = payload.accused.canCreate;
                permissionData.accused.canView = payload.accused.canView;
                permissionData.accused.canUpdate = payload.accused.canUpdate;
                permissionData.accused.canDelete = payload.accused.canDelete;
            }
            if (payload.hasOwnProperty("management")) {
                permissionData.management.canCreate = payload.management.canCreate;
                permissionData.management.canView = payload.management.canView;
                permissionData.management.canUpdate = payload.management.canUpdate;
                permissionData.management.canDelete = payload.management.canDelete;
            }
            if (payload.hasOwnProperty("users")) {
                permissionData.users.canCreate = payload.users.canCreate;
                permissionData.users.canView = payload.users.canView;
                permissionData.users.canUpdate = payload.users.canUpdate;
                permissionData.users.canDelete = payload.users.canDelete;
            }
            if (payload.hasOwnProperty("permissions")) {
                permissionData.permissions.canCreate = payload.permissions.canCreate;
                permissionData.permissions.canView = payload.permissions.canView;
                permissionData.permissions.canUpdate = payload.permissions.canUpdate;
                permissionData.permissions.canDelete = payload.permissions.canDelete;
            }
            if (payload.hasOwnProperty("locations")) {
                permissionData.locations.canCreate = payload.locations.canCreate;
                permissionData.locations.canView = payload.locations.canView;
                permissionData.locations.canUpdate = payload.locations.canUpdate;
                permissionData.locations.canDelete = payload.locations.canDelete;
            }

            if (payload.hasOwnProperty("district")) {
                permissionData.district.canCreate = payload.district.canCreate;
                permissionData.district.canView = payload.district.canView;
                permissionData.district.canUpdate = payload.district.canUpdate;
                permissionData.district.canDelete = payload.district.canDelete;
            }

            if (payload.hasOwnProperty("city")) {
                permissionData.city.canCreate = payload.city.canCreate;
                permissionData.city.canView = payload.city.canView;
                permissionData.city.canUpdate = payload.city.canUpdate;
                permissionData.city.canDelete = payload.city.canDelete;
            }

            if (payload.hasOwnProperty("extras")) {
                permissionData.extras.canCreate = payload.extras.canCreate;
                permissionData.extras.canView = payload.extras.canView;
                permissionData.extras.canUpdate = payload.extras.canUpdate;
                permissionData.extras.canDelete = payload.extras.canDelete;
            }
            if (payload.hasOwnProperty("dropdowns")) {
                permissionData.dropdowns.canCreate = payload.dropdowns.canCreate;
                permissionData.dropdowns.canView = payload.dropdowns.canView;
                permissionData.dropdowns.canUpdate = payload.dropdowns.canUpdate;
                permissionData.dropdowns.canDelete = payload.dropdowns.canDelete;
            }
            if (payload.hasOwnProperty("contactUs")) {
                permissionData.contactUs.canCreate = payload.contactUs.canCreate;
                permissionData.contactUs.canView = payload.contactUs.canView;
                permissionData.contactUs.canUpdate = payload.contactUs.canUpdate;
                permissionData.contactUs.canDelete = payload.contactUs.canDelete;
            }
            if (payload.hasOwnProperty("customforms")) {
                permissionData.customforms.canCreate = payload.customforms.canCreate;
                permissionData.customforms.canView = payload.customforms.canView;
                permissionData.customforms.canUpdate = payload.customforms.canUpdate;
                permissionData.customforms.canDelete = payload.customforms.canDelete;
            }
            if (payload.hasOwnProperty("addforms")) {
                permissionData.addforms.canCreate = payload.addforms.canCreate;
                permissionData.addforms.canView = payload.addforms.canView;
                permissionData.addforms.canUpdate = payload.addforms.canUpdate;
                permissionData.addforms.canDelete = payload.addforms.canDelete;
            }
            if (payload.hasOwnProperty("useforms")) {
                permissionData.useforms.canCreate = payload.useforms.canCreate;
                permissionData.useforms.canView = payload.useforms.canView;
                permissionData.useforms.canUpdate = payload.useforms.canUpdate;
                permissionData.useforms.canDelete = payload.useforms.canDelete;
            }

            [err, data] = await to(permissionData.save());
            if (err) { TE(err.message, true); }
            return data ? { data: data } : false;
        }
    },

    getOneRole : async function (id) {
        let err, roles;
        [err, roles] = await to(Role.findById(id).populate('createdBy', ['name']));
        if (err) { TE(err.message, true); }

        return roles ? { data: roles } : false;
    },
    deleteRole: async function(id){
        let data,err;
        [err,data] = await to(Role.findByIdAndDelete(id))
        if(err) {TE(err, true);}
        [err, allRoles] = await to(Role.find({}).populate('createdBy',['name']));
        if(err) {TE(err, true);}
        return allRoles;
     },
     getUserRoles: async function (userId) {
        let err, roles ;
        [err, roles] = await to(Role.find({"createdBy":userId}).populate('createdBy',['name']));
        if(err){TE(err.message, true);}

        return roles? {data: roles}: false;
    },
    getOneRoleByUser: async function (userid) {
        // console.log(userid);
        let err, roles, user;
        [err, user] = await to(Users.findById(userid));
        // console.log(user);
        [err, roles] = await to(Role.findById(user.role_id).populate('createdBy', ['name']));
        if (err) { TE(err.message, true); }

        return roles ? { data: roles } : false;
    },
}