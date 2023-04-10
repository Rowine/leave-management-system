import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div
      className="text-center max-height-100vh d-flex align-items-center justify-content-center
    flex-column py-5 my-5"
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
