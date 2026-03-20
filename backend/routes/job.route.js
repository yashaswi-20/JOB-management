import express from 'express';

import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from '../controllers/job.controller.js';
import { dataCreationLimiter } from '../middlewares/rateLimit.js';

const router=express.Router();
router.route('/post').post(isAuthenticated, dataCreationLimiter, postJob)
router.route('/get').get(getAllJobs)
router.route('/get/:id').get(getJobById)
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs)
router.route('/update/:id').put(isAuthenticated, updateJob)
export default router;