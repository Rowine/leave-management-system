import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteLeave } from '../../features/leave/leaveSlice'

const TableAction = ({ id }) => {
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteLeave(id))
    toast.warning('Deleted successfully')
  }

  return (
    <div className="d-flex justify-content-center">
      <Link to={`/edit/${id}`}>
        <button type="button" className="btn btn-sm btn-warning me-2">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </Link>

      <button
        type="button"
        className="btn btn-sm btn-danger"
        onClick={() => handleDelete(id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}
export default TableAction
