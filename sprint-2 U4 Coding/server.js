const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () =>{
    return mongoose.connect(`mongodb+srv://mas_alam:arif9718masai@cluster-masai.x7vfv.mongodb.net/mycoding?retryWrites=true&w=majority`);
}

// USER SCHEMA 
const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        middleName: {type: String, required: false},
        lastName: {type: String, required: true},
        age:{type: String, required: true},
        email: {type: String, required: true},
        address: {type: String, required: true},
        gender: {type: String, required: false,default:"Female"},
        type : {type: String, required: false,default:"Customer"},
        branchId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"branch",
            required: true
        },
        master: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"master",
            required: true,
            unique: true
        } ,
        saving: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"saving",
            required: true,
            unique: true
        } ,
        fixed: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"fixed",
            required: false,
            unique: true
        } 
    },
    {
        versionKey: false,
        timestamps: true
    }
);

// USER MODEL
const User = mongoose.model("user" , userSchema);

// BRANCH SCHEMA
const branchSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
        ifsc : {type: String, required: true},
        micr: {type: Number, required: true},
        

    },
    {
        versionKey: false,
        timestamps :true
    }
)


//BRANCH MODEL
const Branch = mongoose.model("branch" , branchSchema);

//MasterAccount schema
const masterSchema = new mongoose.Schema(
    {
        balance: {type: String, required: true}, 
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required: true,
            unique: true
        }       
    },
    {
        versionKey: false,
        timestamps :true
    }
)

//MasterAccount model
const Master = mongoose.model("master" , masterSchema);


//Saving Account Schema
const savingSchema = new mongoose.Schema(
    {
        account_number: {type: String, required: true, unique:true}, 
        balance: {type: String, required: true},
        interestRate: {type: String, required: true},
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps :true
    }
)
//Saving Account model
const Saving = mongoose.model("saving" , savingSchema);

//Fixed Account schema
const fixedSchema = new mongoose.Schema(
    {
        account_number: {type: String, required: true, unique:true}, 
        balance: {type: String, required: true},
        interestRate: {type: String, required: true},
        startDate:  {type: Date, required: true},
        maturityDate: {type: Date, required: true},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps :true
    }
)

//Fixed Account model
const Fixed = mongoose.model("fixed", fixedSchema);


app.get("/master:id",async (req, res)=>{
   try {
    const master = await Master.findById(req.params.id).populate("userId").lean().exec();   
    return res.status(200).send({master: master});
   } catch (error) {
       return res.status(500).send({'message': error.message});
   }
})



app.post("/saving:id",(req, res)=>{
    try {
        const saving = await Saving.create(req.params.id,req.body);   
        return res.status(200).send({master: saving});
       } catch (error) {
           return res.status(500).send({'message': error.message});
       }
})

app.post("/fixed:id",(req, res)=>{
    try {
        const fixed = await Fixed.create(req.params.id,req.body);   
        return res.status(200).send({master: fixed});
       } catch (error) {
           return res.status(500).send({'message': error.message});
       }
})


app.get("/master:id",async (req, res)=>{
    try {
     const master = await Master.findById(req.params.id).populate({path: 'userId',select:{
         populate:{path: ""}
     }}).lean().exec();   
     return res.status(200).send({master: master});
    } catch (error) {
        return res.status(500).send({'message': error.message});
    }
 })



app.listen(5080,()=>{
    console.log('App is running on 5080');
})
