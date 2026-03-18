import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({ msg: 'Company name is required' })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({ msg: 'Company already exists' })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        return res.status(201).json({ msg: 'Company registered successfully', company })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const company = await Company.find({ userId });
        if (!company) {
            return res.status(404).json({ msg: 'Company not found' })
        }
        return res.status(200).json(company)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ msg: 'Company not found' })
        }
        return res.status(200).json(company)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const updateData = { name, description, website, location };

        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            updateData.logo = cloudResponse.secure_url;
        }

        const update = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!update) {
            return res.status(404).json({ msg: 'Company not found' })
        }
        return res.status(200).json({ msg: 'Company updated successfully', company: update })

    } catch (err) {
        return res.status(500).json({ msg: err.message, success: false })
    }
}

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find({});
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}