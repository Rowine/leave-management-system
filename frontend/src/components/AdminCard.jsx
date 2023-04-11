import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AdminCard = ({ title, count, link, background }) => {
  return (
    <Card
      className={`p-3 d-flex flex-column bg-${background} bg-gradient text-white`}
    >
      <Card.Body className="d-flex justify-content-between">
        <Card.Title className="fw-bold fs-3">{title}</Card.Title>
        <Card.Text className="fw-bold fs-3">{count}</Card.Text>
      </Card.Body>
      <Button as={Link} to={link} variant="outline-light" className="m-3">
        View {title}
      </Button>
    </Card>
  )
}
export default AdminCard
