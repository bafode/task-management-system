import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h1>Tasks</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
            <div className="row">
                <div className="col-md-8 offset-md-2">

                            <div
                                className="mt-5"
                                style={{ borderBottom: "5px solid indigo" }}
                            >
                                <h2 className="mb-5">
                                    <span className="bg-primary">
                                        Order ID: 1
                                    </span>
                                </h2>

                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        {/* {showStatus(o)} */}
                                    </li>
                                    <li className="list-group-item">
                                        Transaction ID:id
                                    </li>
                                    <li className="list-group-item">
                                        Amount: amount
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: name
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{" "}
                                        date
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: address
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    length
                                </h3>
                                    <div
                                        className="mb-4"
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {/* {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)} */}
                                    </div>
                                
                            </div>
                </div>
            </div>
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
