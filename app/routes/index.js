var express = require('express');
var router = express.Router();
//controllers
const userController = require('../controllers/usercontroller');
const districtController = require('../controllers/districtscontroller');
const cityController = require('../controllers/cityController');
const dropDownController = require('../controllers/dropDowncontroller');
const caseController = require('../controllers/caseController');
const accusedController = require('../controllers/accusedController');
const roleController = require('../controllers/roleController');
const formController = require('../controllers/formBuildercontroller');
const formDataController = require('../controllers/formDataController');

const dataModel = require('../models/cases');
var XLSX = require('xlsx');
var path   = require('path');
//authenticate middlewares
const passport = require('passport');
var authenticate = require('../middlewares/authenticate');
var upload = require('../middlewares/fileuploadmiddleware');
const fs = require('fs');
// const file = require('../public/exports')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//user routes
router.post('/createuser',userController.createUser);
router.get('/displayusers/:role_id',authenticate,userController.displayUsers);
router.get('/displayoneuser/:id',userController.displayOneUser);
router.put('/updateuser/:id',authenticate,userController.updateUser);
router.delete('/deleteusers/:id',authenticate,userController.deleteUser);
router.post('/users/login',userController.userLogin);
router.put('/users/passwordupdate',userController.passwordUpdate);

//district routes
router.post('/createdistrict',authenticate,districtController.createUser);
router.get('/displaydistricts/:role_id',authenticate,districtController.displayDistricts);
router.get('/displayonedistrict/:id',authenticate,districtController.displayOneDistrict);
router.put('/updatedistricts/:id',authenticate,districtController.updateDistrict);
router.delete('/deletedistrict/:id',authenticate,districtController.deleteDistrict);

router.post('/adddistrict',districtController.createUser);
router.get('/getdistricts',districtController.getDistricts);
//city routes
router.post('/createcity',authenticate,cityController.createCity);
router.get('/displaycities/:role_id',authenticate,cityController.displayCities);
router.get('/displayonecity/:id',authenticate,cityController.displayOneCity);
router.put('/updatecity/:id',authenticate,cityController.updateCity);
router.get('/allcities',authenticate,cityController.displayCities2);
router.delete('/deletecity/:id',authenticate,cityController.deleteCity);
router.get('/citiesbydistrictid',cityController.getCitiesByDistrict);


//dropDown routers

router.post('/createdropdown', authenticate, dropDownController.createDropdown);
router.get('/displaydropdown/:role_id', authenticate,dropDownController.displayDropdown);
router.get('/getonedropdown/:id',authenticate,dropDownController.displayoneDropdown);
router.get('/filtertypedropdown', authenticate,dropDownController.filterDropdown);
router.get('/filterstatusdropdown', authenticate,dropDownController.filterDropdown2);
router.put('/updatedropdown/:id',authenticate,dropDownController.updateDropdown);

router.delete('/deletedropdown/:id',authenticate,dropDownController.deleteDropdown);

//case routers

router.post('/createcase', authenticate, caseController.createCase);
router.get('/displaycases/:role_id',authenticate,caseController.displayCase);
router.get('/displayonecase/:id', authenticate, caseController.displayoneCase);
router.put('/updatecase/:id',authenticate,caseController.updateCases);
router.delete('/deletecase/:id',authenticate,caseController.deleteCase);
router.get('/displayaccusesfromcases/:id',authenticate,caseController.displayAccusedfromCase);
router.post('/filterdropwdowncases', caseController.filterDropdown);
router.get('/exportdata',caseController.exportCases);
router.post('/filtermultiplecases',caseController.multiSelectCasesInfo);


//Accused routers

router.post('/createdaccused', authenticate, accusedController.createAccused);
router.get('/displayaccused/:role_id', authenticate, accusedController.displayAccuses);
router.get('/displayoneAccused/:id',authenticate, accusedController.displayoneAccused);
router.put('/updateaccused/:id',authenticate, accusedController.updateAccused);
router.delete('/deleteaccused/:id',authenticate, accusedController.deleteAccused);
router.post('/uploadfileaccuses', authenticate, upload.single('file'),accusedController.importFile);

//roles

router.post('/createrole/:userid',authenticate,roleController.createRole);
router.get('/getallRoles',authenticate,roleController.displayRoles);
router.put('/updaterole/:id',authenticate,roleController.updateRole);
router.get('/displayonerole/:id', authenticate,roleController.getOneRole);
router.delete('/deleterole/:id',authenticate,roleController.deleteRoles);
router.get('/get/permissions/:id',authenticate,roleController.getOneRoleByUser);

//formBuilder controllers

router.post('/createform',authenticate,formController.createField);
router.get('/displayfields',authenticate,formController.displayFields);
router.get('/displayonefeild/:id',authenticate,formController.displayOneFeild);
router.put('/updateform/:id',authenticate, formController.updateFormField);

//FormData controllers
router.post('/addformdata',authenticate,formDataController.createFormData);
// router.post('/exportdata',(req,res)=>{
//   dataModel.find((err,data)=>{
//       if(err){
//           console.log(err)
//       }else{
//         // console.log(data);
        //   var wb = XLSX.utils.book_new();
        //   var ws = XLSX.utils.json_to_sheet(data);
        //   // var down = 'http://localhost:3005/exports/';
        //   // console.log(ws);
        //  XLSX.utils.book_append_sheet(wb,ws,"sheet1");
        //  var dir = './public/exports';
        //  if(!fs.existsSync(dir)){
        //    fs.mkdirSync(dir);
        //  }
//         //  XLSX.writeFile(wb,down);
//         data2 = () => {
//           console.log('2');
        //   return new Promise((resolve,reject)=>{
            
        //     XLSX.writeFileAsync("./public/exports/myfile.xlsx",wb, function(error,result){
        //       if(error) {
        //         console.log('1');
        //         console.log(error);
        //       }
             
        //       console.log(result);
        //       (error)? reject(error) : resolve(result);
        //     });
        
        //   })
        //  };
        //  let a = data2();
        //  return a;
        

//         //  fs.()
//         //  fs.appendFile('./public/exports/myfile.xlsx',wb);
//         //  res.download(down);
//       }
//   }).projection({_id : 0, complaint_name :1, 
//     name_of_policeteam : 1 , case_report : 1 , 
//     police_station : 1 , section : 1} );
// });

 

// router.post('/users/logout',authenticate,(req,res)=>{
//  // console.log(req);
//   req.logout();
//   res.status().send();
// });
module.exports = router;
