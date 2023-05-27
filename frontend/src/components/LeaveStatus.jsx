import { Badge } from 'react-bootstrap'

const LeaveStatus = ({ status }) => {
  const statusColor = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
  }
  return (
    <Badge bg={statusColor[status]} className="text-capitalize">
      {status}
    </Badge>
  )
}
export default LeaveStatus
