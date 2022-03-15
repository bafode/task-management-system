import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createTask } from '../actions/taskActions'
import { TASK_CREATE_RESET } from '../constants/taskConstants'

const TaskEditScreen = ({ history }) => {

  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const taskCreate = useSelector((state) => state.taskCreate)
  const {loading,error,success} = taskCreate

  useEffect(() => {
    if (success) {
      dispatch({ type: TASK_CREATE_RESET })
      history.push('/admin/tasklist')
    } 
  }, [dispatch,history])

   const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createTask({
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
        <h1>Create Task</h1>
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

export default TaskCreateScreen
