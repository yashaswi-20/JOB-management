import express from 'express';
import Job from '../models/job.model.js';

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, experienceYear, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !experienceYear || !companyId) {
            return res.status(400).json({ msg: 'All fields are required' })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            position,
            experienceYear: Number(experienceYear),
            company: companyId,
            createdBy: userId
        })
        return res.status(201).json({ msg: 'Job posted successfully', job })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

//for student to view all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },       //Match if title matches the keyword or description matches the keyword
                { description: { $regex: keyword, $options: 'i' } },
            ]
        };
        const jobs = await Job.find(query);
        if (!jobs) {
            return res.status(404).json({ msg: 'No jobs found' })
        }
        return res.status(200).json({ jobs, success: true })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

//student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' })
        }
        return res.status(200).json({ job, success: true })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

//all jobs posted by a admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ createdBy: adminId });
        if (!jobs) {
            return res.status(404).json({ msg: 'No jobs found' })
        }
        return res.status(200).json({ jobs, success: true })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}