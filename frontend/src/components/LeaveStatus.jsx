import { Badge } from 'react-bootstrap'

const LeaveStatus = ({ status }) => {
  const statusColor = {
    Pending: 'warning',
    Approved: 'success',
    Rejected: 'danger',
  }
  return (
    <Badge bg={statusColor[status]} className="text-capitalize">
      {status}
    </Badge>
  )
}
export default LeaveStatus
