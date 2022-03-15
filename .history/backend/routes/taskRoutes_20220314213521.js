import express from 'express'
const router = express.Router()
import {
    getTasks,
    getTaskById,
    createTAsk,
    updateTask,
    deleteTask
} from '../controllers/taskControllers.js'
//import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getTasks).post(createTAsk)
router
  .route('/:id')
  .get(getTaskById)
  .delete(deleteTask)
  .put(updateTask)

export default router