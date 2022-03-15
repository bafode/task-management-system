import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listTaskDetails, updateTask } from '../actions/taskActions'
import { TASK_UPDATE_RESET } from '../constants/taskConstants'

const TaskEditScreen = ({ match, history }) => {
  const taskId = match.params.id

  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const taskDetails = useSelector((state) => state.taskDetails)
  const { loading, error, task } = taskDetails

  const taskUpdate = useSelector((state) => state.taskUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = taskUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TASK_UPDATE_RESET })
      history.push('/admin/tasklist')
    } else {
      if (!task.name || task._id !== taskId) {
        dispatch(listTaskDetails(taskId))
      } else {
        setName(task.name)
        setStatus(task.status)
        setPriority(task.priority)
        setDescription(task.description)
      }
    }
  }, [dispatch, history, taskId, task, successUpdate])

   const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: taskId,
        name,
        status,
        priority,
        description,
      })
    )
  }

  return (
    <>
      <Link to='/admin/tasklist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Task</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='status'>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              ></Form.Control>
            </Form.Group>

              <Form.Group controlId='priority'>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Priority'
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default TaskEditScreen
