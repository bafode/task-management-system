import asyncHandler from 'express-async-handler'
import Project from '../models/Project.js'
import Task from '../models/taskModel.js'

// @desc    Fetch all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Task.countDocuments({ ...keyword })
  const tasks = await Task.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ tasks, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single task
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task) {
    res.json(task)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

// @desc    Delete a Task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task) {
    await task.remove()
    res.json({ message: 'Task removed' })
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private/Admin
const createTAsk = asyncHandler(async (req, res) => {
    const {name,description,project,priority,status}=req.body
  const task = new Task({
    name: name,
    project: '622e1761475684f206db2f9f',
    user: "622dfb1eea6d72ce029cb28d",
    priority: priority,
      description: description,
    status:status
  })

  const createdTask = await task.save()
  res.status(201).json(createdTask)
})

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private/Admin
const updateTask = asyncHandler(async (req, res) => {
   const {name,description,project,priority,status}=req.body

  const task = await Task.findById(req.params.id)

  if (task) {
    task.name = name
    task.description = description
    task.priority = priority
    task.status = status

    const updatedTask = await task.save()
    res.json(updatedTask)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

// @desc    Fetch tasks by project
// @route   GET /api/tasks/:id
// @access  Public
const getTasksByProject = asyncHandler(async (req, res) => {
  
    const project = await Project.findById(req.body.project)
    if (!project) {
         res.status(404)
         throw new Error('Project not found')
    }
   const tasks = await Task.find({project:project})

  if (tasks) {
    res.json(tasks)
  } else {
    res.status(404)
    throw new Error('Tasks not found')
  }
})




export {
    getTasks,
    getTaskById,
    createTAsk,
    updateTask,
    deleteTask,
    getTasksByProject
}