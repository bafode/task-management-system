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
import TaskCreateScreen from './TaskCreateScreen'




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
    }
  }, [dispatch, match,keyword,pageNumber])




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
            <Col md={6}>
               <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h1>{project.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                 <h4> Description: {project.description}</h4>
                </ListGroup.Item>
              </ListGroup>
            </Col>
             <Col md={6}>
              <TaskCreateScreen/>
              </Col>
           
          </Row>
          <Row>
           
               <Col >
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
                <td>{task.status}</td>
                <td>{task.priority}</td>
                   
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
               
                
            
            </tbody>
          </Table>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
              </Row>
        </>
      )}
    </>
  )
}

export default Projectcreen
