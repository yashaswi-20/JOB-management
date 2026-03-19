import express from 'express';

import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';
import { dataCreationLimiter } from '../middlewares/rateLimit.js';

const router=express.Router();
router.route('/post').post(isAuthenticated, dataCreationLimiter, postJob)
router.route('/get').get(isAuthenticated,getAllJobs)
router.route('/get/:id').get(isAuthenticated,getJobById)
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs)
export default router;