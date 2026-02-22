import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:{
        type:[{String}],
       
    },
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        
        required:true
    },
    position:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    applicants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }]
},{timestamps:true})

export default mongoose.model('Job',jobSchema)