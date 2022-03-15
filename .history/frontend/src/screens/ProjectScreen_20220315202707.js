import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listProjectDetails } from '../actions/projectActions'
import { listTasks } from '../actions/taskActions'


const Projectcreen = ({ history, match }) => {

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1


  const dispatch = useDispatch()

  const projectDetails = useSelector((state) => state.projectDetails)
  const { loading, error, project } = projectDetails

   const taskList = useSelector((state) => state.taskList)
  const {error:errorTask,loading:loadingTask,tasks, page, pages } = taskList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!project._id || project._id !== match.params.id) {
      dispatch(listProjectDetails(match.params.id))
      dispatch(listTasks(keyword, pageNumber))
      console.log("tasks:"+tasks)
    }
  }, [dispatch, match,keyword,pageNumber])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}`)
  }

//   const submitHandler = (e) => {
//     e.preventDefault()
//     dispatch(
//       createProductReview(match.params.id, {
//         rating,
//         comment,
//       })
//     )
//   }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={project.name} />
          <Row>
            <Col md={4}>
               <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{project.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {project.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
         
            <Col md={8}>
               <h2>Tasks</h2>
              <Card>
                <ListGroup variant='flush'>
                 
                  <ListGroup.Item>
                     <Row>
                       <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
               {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task._id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>
                  {task.status==="Delivered" ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${task._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() =>{}}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
                <tr >
                  <td>123456</td>
                  <td>task1</td>
                  <td>authentification</td>
                  <td> Processing</td>
                 
                  <td>
                    <LinkContainer to={`/tasks/123`}>
                      <Button className='btn-sm' variant='info'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
                 <tr >
                  <td>123456</td>
                  <td>task1</td>
                  <td>authentification</td>
                  <td> Processing</td>
                 
                  <td>
                    <LinkContainer to={`/tasks/123`}>
                      <Button className='btn-sm' variant='info'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
                 <tr >
                  <td>123456</td>
                  <td>task1</td>
                  <td>authentification</td>
                  <td> Processing</td>
                 
                  <td>
                    <LinkContainer to={`/tasks/123`}>
                      <Button className='btn-sm' variant='info'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
            
            </tbody>
          </Table>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <ListGroup variant='flush'>
            
                <ListGroup.Item>
                  <h2>Create New Task</h2>
                
                    {/* <Message variant='success'>
                      Review submitted successfully
                    </Message>
                    <Message variant='danger'>error</Message> */}
                
                    <Form onSubmit={()=>{}}>
                      <Form.Group controlId='name'>
                        <Form.Label>name</Form.Label>
                        <Form.Control
                          type='name'
                          row='3'
                          value=""
                          onChange={(e) => {}}
                        ></Form.Control>
                      </Form.Group> 
                       <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value=""
                          onChange={(e) => {}}
                          
                        ></Form.Control>
                      </Form.Group> 
                      <Form.Group controlId='status'>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          as='select'
                          value=""
                          onChange={(e) =>{}}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Not processed</option>
                          <option value='2'>2 - Processing</option>
                          <option value='3'>3 - Delivered</option>
                          <option value='4'>4 - Cancelled</option>
                        </Form.Control>
                      </Form.Group>
                     <Form.Group controlId='priority'>
                        <Form.Label>Priority</Form.Label>
                        <Form.Control
                          as='select'
                          value=""
                          onChange={(e) =>{}}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Low</option>
                          <option value='2'>2 - Medium</option>
                          <option value='3'>3 - Hight</option>
                        </Form.Control>
                      </Form.Group>
                      <Button
                        
                        type='submit'
                        variant='primary'
                      >
                        Create
                      </Button>
                    </Form>
                
                    <Message>
                      Please <Link to='/login'>sign in</Link> to create task{' '}
                    </Message>
               
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default Projectcreen
