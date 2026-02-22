import Company from "../models/company.model.js";
export const registerCompany=async(req,res)=>{
    try{    
        const {companyName}=req.body;
        if(!companyName){
            return res.status(400).json({ msg: 'Company name is required' })
        }
        let company=await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({ msg: 'Company already exists' })
        }
        company=await Company.create({
            name:companyName,
            userId:req.id
        })
        return res.status(201).json({ msg: 'Company registered successfully',company })

    }catch(err){
        return res.status(500).json({ msg: err.message })
    }
}

export const getCompany=async(req,res)=>{
    try{
        const userId=req.id;
        const company=await Company.find({userId});
        if(!company){
            return res.status(404).json({ msg: 'Company not found' })
        }
        return res.status(200).json(company)
    }catch(err){
        return res.status(500).json({ msg: err.message })
    }
}

export const getCompanyById=async(req,res)=>{
    try{
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({ msg: 'Company not found' })
        }
        return res.status(200).json(company)
    }catch(err){
        return res.status(500).json({ msg: err.message })
    }
}

export const updateCompany=async(req,res)=>{
    try{
        const {name,discription,website,location}=req.body;
        const file=req.file;
        //cloudnary will be added here for logo
        const updateData={name,discription,website,location};
        const update=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true})
        if(!update){
            return res.status(404).json({ msg: 'Company not found' })
        }
        return res.status(200).json({ msg: 'Company updated successfully',company:update })

    }catch(err){
        return res.status(500).json({ msg: err.message,success:false })
    }
}