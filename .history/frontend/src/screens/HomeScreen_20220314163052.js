import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Project from '../components/Project'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { listProjects } from '../actions/projectActions'
import { Card } from 'react-bootstrap'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
    const projectList = useSelector((state) => state.projectList)
  const {  projects} = productList

  useEffect(() => {
    dispatch(listProjects())
  }, [dispatch])

  return (
    <>
      <h1>Projects</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ): (
        <>
          <Row>
      
              <Col  sm={12} md={6} lg={4} xl={3}>
                <Card className='my-3 p-3 rounded'>
      <Link to={`/product/1`}>
      </Link>

      <Card.Body>
        <Link to={`/product/1`}>
          <Card.Title as='div'>
            <strong>name</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          Rating
        </Card.Text>

        <Card.Text as='h3'>price</Card.Text>
      </Card.Body>
    </Card>
              </Col>
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
