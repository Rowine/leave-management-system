import express from 'express'
import {
  approveLeave,
  createLeave,
  deleteLeave,
  getLeaveById,
  getLeaves,
  rejectLeave,
  updateLeave,
} from '../controllers/leaveController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect, admin, getLeaves).post(protect, createLeave)
router
  .route('/:id')
  .get(protect, getLeaveById)
  .delete(protect, deleteLeave)
  .put(protect, admin, updateLeave)
router.route('/:id/approve').put(protect, admin, approveLeave)
router.route('/:id/reject').put(protect, admin, rejectLeave)

export default router
