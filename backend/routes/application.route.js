import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.route('/apply/:id').post(isAuthenticated, applyJob);
router.route('/getjobs').get(isAuthenticated, getAppliedJobs);
router.route('/getapplicants/:id').get(isAuthenticated, getApplicants);
router.route('/update/:id').post(isAuthenticated, updateStatus);

export default router;
