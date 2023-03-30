import asynchHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asynchHandler(async (req, res) => {
  const categories = await Category.find({})
  res.json(categories)
})

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asynchHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asynchHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await category.deleteOne()
    res.json({ message: 'Category removed' })
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asynchHandler(async (req, res) => {
  const category = new Category({
    name: req.body.name,
  })

  const createdCategory = await category.save()
  res.status(201).json(createdCategory)
})

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asynchHandler(async (req, res) => {
  const { name } = req.body

  const category = await Category.findById(req.params.id)

  if (category) {
    category.name = name

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

export {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
}
