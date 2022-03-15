import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {createProject} from '../actions/projectActions'
import { PROJECT_CREATE_RESET } from '../constants/projectConstants'

const ProductCreateScreen = ({history }) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const projectCreate = useSelector((state) => state.projectCreate)
    const { loading, error, success } = projectCreate
    
    

  useEffect(() => {
    if (success) {
      history.push('/')
    }
  }, [history])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("NAME:"+name+" DES: "+description)
      dispatch(
          createProject(name, description)
      )
      setName("")
      setDescription("")
  }

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Project</h1>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
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
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductCreateScreen
