const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    CompanyName:{type:String, required:true},  
   
},
{
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.models("publication",publicationSchema);