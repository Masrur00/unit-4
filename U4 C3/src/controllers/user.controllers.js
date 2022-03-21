
const User = require('../models/user.models');

const express = require('express');

const router = express.Router();

router.get("", async (req,res)=>{
    try {
       const user = await User.find().lean().exec(); 
       return  res.status(201).send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.post("",
     body("FirstName").trim().not().isEmpty().custom((value)=>{
         if(value.length < 3 ||  value.length > 30){
             throw error('Name must be between 3 to 30 charactres long');
         }
         return true;
     }),
     body("lastName").custom((value)=>{
         if(value.length != 0){
         if(value.length < 3 ||  value.length > 30){
             throw error('LastName must be between 3 to 30 charactres long');
         }}
         return true;
     }),
     body('age').custom((value)=>{
         if(value < 1 || value > 150 ){
            throw error('age must be between 1 to 150 only.');
         }
         return true;
     }),body('email').custom((value,{req})=>{
         const em = User.find("email");
         if(req.email === em ){
            throw error('email already exist.');
         }
        return true;
     })

    ,async (req,res)=>{
    try {
    //    console.log() 
       const user = await User.create(req.body);
       return  res.status(201).send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
})




module.exports = router;