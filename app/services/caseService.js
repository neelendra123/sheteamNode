const { to } = require('../middlewares/utilservices');
var express = require('express');
const cases = require('../models/cases');
const permission = require('../models/roles');
var XLSX = require('xlsx');
var path = require('path');
const fs = require('fs');
module.exports = {
    createCase: async function (payload) {
        let err, addCase;

        addCase = new cases({
            complaint_name: payload.complaint_name,
            case_type: payload.case_type,
            section: payload.section,
            police_station: payload.police_station,
            name_of_policeteam: payload.name_of_policeteam,
            case_report: payload.case_report,
            case_status: payload.case_status,
            accused_id: payload.accused_id,
            status: payload.hasOwnProperty('status') ? payload.status : 1
        });
        let newCase;
        [err, newCase] = await to(addCase.save());

        if (err) { TE(err, true); }

        if (newCase) {
            return newCase;
        } else {
            return false;
        }
    },
    displayCases: async function (role_id) {
        let err, data,permissions;
        [err,permissions] = await to(permission.find({'_id' : role_id}));
        [err, data] = await to(cases.find({}).populate(['case_type', 'case_status', 'accused_id']));

        if (err) { TE(err, true); }


        if (data) {
            return {data : data, permissions : permissions[0].cases};
        } else {
            return false;
        }
    },
    updateCase: async function (id, payload) {
        let data, err, updatedData;
        data = await cases.findById(id);

        if (err) { TE(err, true); }
        if (data) {
            console.log(data.accused_id);
            data.complaint_name = payload.hasOwnProperty('complaint_name') ? payload.complaint_name : data.complaint_name;
            data.case_type = payload.hasOwnProperty('case_type') ? payload.case_type : data.case_type;
            data.section = payload.hasOwnProperty('section') ? payload.section : data.section;
            data.police_station = payload.hasOwnProperty('police_station') ? payload.police_station : data.police_station;
            data.name_of_policeteam = payload.hasOwnProperty('name_of_policeteam') ? payload.name_of_policeteam : data.name_of_policeteam;
            data.case_status = payload.hasOwnProperty('case_status') ? payload.case_status : data.case_status;
            data.accused_id = payload.hasOwnProperty('accused_id') ? payload.accused_id : data.accused_id;
            data.status = payload.hasOwnProperty('status') ? payload.status : 1;

            [err, updatedData] = await to(data.save());

            if (err) { TE(err, true); }

            [err, allCases] = await to(cases.find({}));
            console.log(allCases);
            if (err) { TE(err, true); }

            return allCases;
        } else {
            return TE("Unable to update Case details!");
        }
    },
    deleteCase: async function (id) {
        let data, err;
        [err, data] = await to(cases.findByIdAndDelete(id));
        if (err) { TE(err, true); }
        [err, allCases] = await to(cases.find({}));
        if (err) { TE(err, true); }

        return allCases;
    },
    getOneCase: async function (id) {
        let data, err;

        [err, data] = await to(cases.findById(id).populate(['case_type', 'case_status', 'accused_id']));

        if (err) { TE(err, true); }
        if (data) {
            return data;
        } else {
            return false;
        }
    },
    displayAccusedfromCase: async function (id) {
        let data, err;
        // [err, data]= await to(cases.findById(id).populate(['accused_id']));
        [err, data] = await to(cases.findById(id).populate({
            path: 'accused_id',
            populate: [
                {
                    path: 'district',
                    model: 'district'
                },
                {
                    path: 'city',
                    model: 'City'
                },
            ]
        }))
        if (err) { TE(err, true); }
        if (data) {
            return data;
        } else {
            return false;
        }
    },

    dropdownFilters: async function (params, payload) {
        let err, data, data2;

        let match = {};

        if (payload.case_type) {
            match.case_type = payload.case_type;
        }
        if (payload.case_status) {
            match.case_status = payload.case_status;
        }

        [err, data] = await to(cases.find(match)
            .populate('case_type', ['_id', 'value', 'DropdownType'])
            .populate('case_status', ['_id', 'value', 'DropdownType'])
            .populate('accused_id', ['_id', 'name', 'contact']));

        if (err) { TE(err, true); }
        if (data) {
            return data;
        } else {
            return false;
        }
    },
    exportCasesData: async function (payload) {
        let err, data,file;
        [err, data] = await to(cases.aggregate([{
            $project: {
                complaint_name: 1, section: 1, _id: 0,
                police_station: 1, name_of_policeteam: 1, case_report: 1
            }
        }]));
        // console.log(data);
        let array = [];
        data.map((obj)=>{
            array.push({
                complaintname : obj.complaint_name

            })
        });
        // console.log(array);
        if (err) { TE(err, true); }
        if (array) {
            var wb = XLSX.utils.book_new();
            var ws = XLSX.utils.json_to_sheet(array);
            // console.log(ws);
            XLSX.utils.book_append_sheet(wb, ws, "sheet1");
            // console.log(wb.Sheets.sheet1);

            var dir = './public/exports';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            let name = 'casesdata';
            [err,file] = await to(this.writeFileQ(wb, "./public/exports/"+name+".xlsx"));
            if(err) TE(err, true);
    
            return ({file:name+".xlsx"});
        //    [err,file] = await to(this.promiseFunction(wb));
        //    if (err) { TE(err, true); }
        //    return 'myfile.xlsx';

        } else {
            return false;
        }
    }
    ,
    writeFileQ: function(workbook, filename) {
        // console.log(filename); 
        // console.log(workbook);
        
        console.log(workbook);
        return new Promise((resolve, reject) => {
            XLSX.writeFileAsync(filename, workbook, (error, result) => {
              (error)? reject(error) : resolve(result);
            });
        });
    },

    

    multiSelectCasesInfo : async function (params, payload) {
        let err, data;
        
        let match = {};

        if (payload.case_type) {
            match.case_type = payload.case_type;
        }
        if (payload.case_status) {
            match.case_status = payload.case_status;
        }
        // console.log(match);
        [err, data] = await to(cases.find(match)
            .populate('case_type', ['_id', 'value', 'DropdownType'])
            .populate('case_status', ['_id', 'value', 'DropdownType'])
            .populate('accused_id', ['_id', 'name', 'contact']));
        // [err,data] = await to(cases.find({case_type: {$in : [payload, payload]}}))
        if (err) { TE(err, true); }
        if (data) {
            return data;
        } else {
            return false;
        }
    },


}

