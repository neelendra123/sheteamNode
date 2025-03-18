const {to,TE} = require('../middlewares/utilservices');
const City = require('../models/cities');
const permission = require('../models/roles');

module.exports = {
    createCity : async function(payload){
        let err,city;
        let findCity = await City.findOne({city : payload.city});
        console.log(findCity);
        if(findCity){
            TE('city already exists!');
        }
        city = new City({
            city : payload.city,
            dist_id : payload.dist_id,
            status : payload.hasOwnProperty('status') ? payload.status : 1
        });
        let newCity;
        [err, newCity]= await to(city.save());

        if(err) {TE(err, true);}

        if(newCity){
            return newCity;
        }else{
            return false;
        }
    },
    displayCities : async function(role_id){
        let err,data, permissions;
        [err,permissions] = await to(permission.find({'_id' : role_id}));
        [err, data]= await to(City.find({}).populate('dist_id'));
        if(err) {TE(err, true);}

        if(data){
            return {data: data, permissions : permissions[0].city };
        }else{
            return false;
        }
    },
    displayCity2 : async function(payload){
        let err, data;
        [err, data]= await to(City.find({}).populate("dist_id"));
        if(err) {TE(err, true);}

        if(data){
            return data;
        }else{
            return false;
        }
    },
    updateCity : async function(id, payload){
        let data, err, updatedData;
        // console.log(id);
        
        data = await City.findById(id);
        // console.log(data);
        if(err) {TE(err, true);}

        if(data){
            if(payload.city == data.city){
                console.log('1');
                data.city =  payload.hasOwnProperty('city') ? payload.city :  data.city;
                data.dist_id =  payload.hasOwnProperty('dist_id') ? payload.dist_id :  data.dist_id;
                data.status    = payload.hasOwnProperty('status') ? payload.status : 1;

                [err, updatedData] = await to(data.save());
                    if(err) {TE(err, true);}

                    [err, allCities] = await to(City.find({}));
                     console.log(allCities);
                    if(err) {TE(err, true);}
                        return allCities;
            }
            if(payload.city != data.city){
                    let singleCity = await City.findOne({city : payload.city});
                    console.log(singleCity);
                    data.city =  payload.hasOwnProperty('city') ? payload.city :  data.city;
                    data.dist_id =  payload.hasOwnProperty('dist_id') ? payload.dist_id :  data.dist_id;
                    data.status    = payload.hasOwnProperty('status') ? payload.status : 1;

                [err, updatedData] = await to(data.save());
                    if(err) {TE(err, true);}

                    [err, allCities] = await to(City.find({}));
                     console.log(allCities);
                    if(err) {TE(err, true);}
                        return allCities;
        
            }
            
        }else{
            return TE("Unable to update city details!");
        }
    },
    deleteCity: async function(id){
        let data,err;
        [err,data] = await to(City.findByIdAndDelete(id))
        if(err) {TE(err, true);}
        [err, allCities] = await to(City.find({}).populate("dist_id"));
        if(err) {TE(err, true);}
        return allCities;
     },
     getOneCity : async function(id){
        let data,err;
        [err, data]= await to(City.findById(id).populate("dist_id"));
        console.log(data);
        if(err) {TE(err, true);}
        if(data){
            return data;
        }else{
            return false;
        }
    },

    getCitiesByDistrict : async function(params, payload){
        let data,err;
       
      let match = {};
      console.log(params.dist_id);
      if(params.dist_id){
          match.dist_id = params.dist_id;
      }
      console.log(match.dist_id);
      [err, data]= await to(City.find({dist_id:match.dist_id}));

        // console.log(data);
        if(err) {TE(err, true);}
        if(data){
            return data;
        }else{
            return false;
        }
    }
}