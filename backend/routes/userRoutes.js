import express from 'express'
import {
  authUser,
  deleteUser,
  getLeaveByUserId,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
router.route('/:id/leaves').get(protect, getLeaveByUserId)

export default router
