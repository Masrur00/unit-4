const express = require('express');

const User = require('../models/user.models');

const { body, validationResult } = require("express-validator");

const router = express.Router();

router.get("", async (req ,res)=>{
    try {
        
        const user = User.find().lean().exec();
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send({ "message": error });
    }
})


router.post("/", 
body('firstName').trim().not().isEmpty().withMessage('First Name should not be empty: '),
body('lastName').not().isEmpty().withMessage('last Name should not be empty: '),
body('email').not().isEmpty().withMessage('email should not be empty: ').isEmail().withMessage('Not a valid email').custom( async (val)=>{
    const user = await User.findOne( { "email" : val } );
    if(user)
     throw new Error('email alredy exist.');
    return true;
}),
body('pincode').not().isEmpty().withMessage('Pincode should not be empty: ').custom( (val) => {
    if(val.length !== 6){
        throw new Error('Pincode must be exactly 6 digits.')
    }
     return true;
}),
body('age').not().isEmpty().withMessage('Age should not be empty: ').isNumeric().withMessage('Age should only be number').custom((value)=>{
    if(value < 1 || value > 100 ){
        throw new Error('Incorrect age provided.');
    }
    return true;
}),
body('gender').not().isEmpty().withMessage('Gender should not be empty: '),
async (req ,res)=> {
    try {
        // console.log(body("firstName"));

        const errors = validationResult(req);
        console.log(body(errors));
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.create(req.body);

        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send( { message: error.message } );
    }
})



module.exports = router;
