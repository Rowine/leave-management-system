import asyncHandler from 'express-async-handler'
import Leave from '../models/leaveModel.js'

// @desc    Get all leaves
// @route   GET /api/leaves
// @access  Private/Admin
const getLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({})
    .populate('user', 'id name')
    .populate('category', 'id name')

  res.json(leaves)
})

// @desc    Get leaves by status
// @route   GET /api/leaves/status/:status
// @access  Private/Admin
const getLeavesByStatus = asyncHandler(async (req, res) => {
  const status = req.params.status

  const leaves = await Leave.find({ status })
    .populate('user', 'id name')
    .populate('category', 'id name')

  res.json(leaves)
})

// @desc    Get leave by ID
// @route   GET /api/leaves/:id
// @access  Private
const getLeaveById = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id)

  if (leave) {
    res.json(leave)
  }
  res.status(404)
  throw new Error('Leave not found')
})

// @desc    Delete a leave
// @route   DELETE /api/leaves/:id
// @access  Private
const deleteLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id)

  if (leave) {
    await leave.deleteOne()
    res.json({ message: 'Leave removed' })
  } else {
    res.status(404)
    throw new Error('Leave not found')
  }
})

// @desc    Create a leave
// @route   POST /api/leaves
// @access  Private
const createLeave = asyncHandler(async (req, res) => {
  const { startDate, endDate, reason, category } = req.body
  const userId = req.user._id

  const existingLeave = await Leave.findOne({
    user: userId,
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } }, // Check if existing leave overlaps with the new leave
      { startDate: { $gte: startDate, $lte: endDate } }, // Check if existing leave starts during the new leave
      { endDate: { $gte: startDate, $lte: endDate } }, // Check if existing leave ends during the new leave
    ],
  })
  if (existingLeave) {
    res.status(400)
    throw new Error('Leave date already exists')
  }

  const leave = new Leave({
    user: userId,
    startDate,
    endDate,
    reason,
    category,
  })

  const createdLeave = await leave.save()
  res.status(201).json(createdLeave)
})

// @desc    Update a leave
// @route   PUT /api/leaves/:id
// @access  Private
const updateLeave = asyncHandler(async (req, res) => {
  const { startDate, endDate, reason, category } = req.body

  const leave = await Leave.findById(req.params.id)

  if (leave) {
    leave.startDate = startDate || leave.startDate
    leave.endDate = endDate || leave.endDate
    leave.reason = reason || leave.reason
    leave.category = category || leave.category

    const updatedLeave = await leave.save()
    res.json(updatedLeave)
  } else {
    res.status(404)
    throw new Error('Leave not found')
  }
})

const approveLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id)
    .populate('user', 'id name email')
    .populate('category', 'id name')

  if (leave.status === 'pending') {
    leave.status = 'approved'
    leave.approvedBy = req.user._id
    leave.approvedAt = Date.now()

    const updatedLeave = await leave.save()

    res.json(updatedLeave)
  } else {
    res.status(404)
    throw new Error('Leave not approved')
  }
})

const rejectLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id)

  if (leave.status === 'pending') {
    leave.status = 'rejected'
    leave.rejectedBy = req.user._id
    leave.rejectedAt = Date.now()

    const updatedLeave = await leave.save()
    res.json(updatedLeave)
  } else {
    res.status(404)
    throw new Error('Leave not rejected')
  }
})

export {
  approveLeave,
  createLeave,
  deleteLeave,
  getLeaveById,
  getLeaves,
  getLeavesByStatus,
  rejectLeave,
  updateLeave,
}
