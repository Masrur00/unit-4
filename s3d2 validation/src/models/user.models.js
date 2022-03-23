const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String , required: true },
        lastName: { type: String , required: true },
        email: { type: String , required: true, unique:true },
        pincode: { type: Number , required: true, max:999999, length:6 },
        age: { type: Number, min:1, max:100 , required: true },
        gender: { type: String , required: true, enum:["Male","Female","Others"] },
    },
    {
        versionKey: false,
        timestamps:true
    }
);

module.exports = mongoose.model("user" , userSchema);