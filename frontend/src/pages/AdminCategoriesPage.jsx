import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import PaginationItem from '../components/Pagination'
import { deleteCategory, getAllCategories } from '../features/admin/adminSlice'

const AdminCategoriesPage = () => {
  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
  const dispatch = useDispatch()
  const { categories, loading } = useSelector((state) => state.admin)

  // Get 10 categories per page
  const [currentPage, setCurrentPage] = useState(1)
  const [categoriesPerPage] = useState(10)

  // Get current categories
  const indexOfLastCategory = currentPage * categoriesPerPage
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  )

  const handleClick = (id) => {
    setId(id)
    setShow(true)
  }

  const handleClose = () => setShow(false)

  const handleDelete = (id) => {
    dispatch(deleteCategory(id))
    setId('')
    setShow(false)
  }

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className="text-end">
          <Link to="/admin/categories/create">
            <Button variant="primary">Create Category</Button>
          </Link>
        </Col>
      </Row>
      {loading === 'pending' ? (
        <Loader />
      ) : (
        <>
          <Row className="my-3">
            <Col>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 && currentCategories.length > 0 ? (
                    currentCategories.map((category) => (
                      <tr key={category._id}>
                        <td>{category._id}</td>
                        <td>{category.name}</td>
                        <td>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => handleClick(category._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No categories found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>

          <PaginationItem
            perPage={categoriesPerPage}
            total={categories.length}
            paginate={setCurrentPage}
          />
        </>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
export default AdminCategoriesPage
