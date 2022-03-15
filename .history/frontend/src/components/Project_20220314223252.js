import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Project = ({ project }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Link to={`/project/${project._id}`}>
          <Card.Title as='h3'>
            <strong>{project.name}</strong>
          </Card.Title>
        </Link>

    
      </Card.Body>
    </Card>
  )
}

export default Project
