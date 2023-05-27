import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import LeaveTable from '../components/tables/LeaveTable'
import { getCategories } from '../features/category/categorySlice'
import { getLeavesById, leaveReset } from '../features/leave/leaveSlice'

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)
  const { categories } = useSelector((state) => state.category)
  const { leaves, loading, error } = useSelector((state) => state.leave)

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      dispatch(getLeavesById(userInfo))
      if (categories.length === 0) {
        dispatch(getCategories())
      }
      if (error) {
        toast.error(error)
        dispatch(leaveReset())
      }
    }
  }, [userInfo, error, navigate, dispatch])

  return (
    <>
      <div className="d-flex justify-content-between my-3">
        <div>
          <h1>Leave Applications</h1>
        </div>
        <div className="align-self-end">
          <Link to="/create">
            <button type="button" className="btn btn-success">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </Link>
        </div>
      </div>
      {leaves.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No leaves found. Please create one.
        </div>
      ) : (
        <div className="py-3">
          {loading === 'pending' ? <Loader /> : <LeaveTable leaves={leaves} />}
        </div>
      )}
    </>
  )
}
export default HomePage
