import express from 'express'
import {
  approveLeave,
  createLeave,
  deleteLeave,
  getLeaveById,
  getLeaves,
  getLeavesByStatus,
  rejectLeave,
  updateLeave,
} from '../controllers/leaveController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect, admin, getLeaves).post(protect, createLeave)
router.route('/status/:status').get(protect, admin, getLeavesByStatus)
router
  .route('/:id')
  .get(protect, getLeaveById)
  .delete(protect, deleteLeave)
  .put(protect, updateLeave)
router.route('/:id/approve').put(protect, admin, approveLeave)
router.route('/:id/reject').put(protect, admin, rejectLeave)

export default router
