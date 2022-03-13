import asyncHandler from 'express-async-handler'

// @desc    Fetch all tasks
// @route   GET /api/tasks
// @access  Public
export const getAllTasks =asyncHandler( async (req,res) => {
    res.status(200).json({data:'All tasks'})
})

// @desc    Fetch Single task
// @route   GET /api/tasks/:id
// @access  Public
export const getSingleTask =asyncHandler( async (req,res) => {
    res.status(200).json({data:`get task ${req.params.id}`})
})

// @desc    Fetch all tasks
// @route   POST /api/tasks
// @access  Public
export const createTask =asyncHandler( async (req,res) => {
    res.status(201).json({data:'create task'})
})

// @desc    Fetch all tasks
// @route   PUT /api/tasks/:id
// @access  Public
export const updateTask =asyncHandler( async (req,res) => {
    res.status(200).json({data:`update task ${req.params.id}`})
})


export const deleteTask =asyncHandler( async (req,res) => {
    res.status(200).json({data:`delete task ${req.params.id}`})
})

