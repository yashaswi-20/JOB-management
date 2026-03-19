import express from 'express';
import { getAllCompanies, getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';
import { dataCreationLimiter } from '../middlewares/rateLimit.js';

const router = express.Router();

router.route('/register').post(isAuthenticated, dataCreationLimiter, registerCompany);
router.route('/get').get(isAuthenticated, getCompany);
router.route('/get/:id').get(isAuthenticated, getCompanyById);
router.route('/all').get(isAuthenticated, getAllCompanies);
router.route('/update/:id').put(isAuthenticated, singleUpload, updateCompany);

export default router;