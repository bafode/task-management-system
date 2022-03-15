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
  const {  projects} = projectList

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
             {projects.map((project) => (
              <Col key={project._id} sm={12} md={6} lg={4} xl={3}>
                <Project project={project}/>
              </Col>
            ))}
          </Row>
         
        </>
      )}
    </>
  )
}

export default HomeScreen
