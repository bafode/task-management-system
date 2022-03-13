import express from 'express'
const router = express.Router()
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from '../controllers/projectController.js'
//import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProjects).post(createProject)
router
  .route('/:id')
  .get(getProjectById)
  .delete(deleteProject)
  .put(updateProject)

export default router