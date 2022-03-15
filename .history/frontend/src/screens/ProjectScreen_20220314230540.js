import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {listProjectDetails} from '../actions/projectActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const Projectcreen = ({ history, match }) => {
//   const [qty, setQty] = useState(1)
//   const [rating, setRating] = useState(0)
//   const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const projectDetails = useSelector((state) => state.projectDetails)
  const { loading, error, project } = projectDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!project._id || project._id !== match.params.id) {
        dispatch(listProjectDetails(match.params.id))
    }
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
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
            <Col md={6}>
              image
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{project.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {project.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${project.name}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                         Out Of Stock
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Tasks</h2>
              <Message>No Reviews</Message>
              <ListGroup variant='flush'>
              
                  <ListGroup.Item >
                    <strong>task name</strong>
                    <p>date</p>
                    <p>description</p>
                  </ListGroup.Item>
            
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                    <Message variant='danger'>{errorProductReview}</Message>
                
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
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