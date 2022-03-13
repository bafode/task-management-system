import express from 'express'
import { getAllTasks,getSingleTask,createTask,updateTask,deleteTask } from '../controllers/taskControllers.js'


const router = express.Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getSingleTask).put(updateTask).delete(deleteTask)


export default router