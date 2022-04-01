import express from 'express'

import {
  findAll,
  findById,
  findByName,
  updateAuthor,
  deleteAuthor,
  createAuthor,
} from '../controllers/author'

const router = express.Router()

router.get('/all', findAll)
router.get('/id/:authorId', findById)
router.get('/name/:authorName', findByName)

router.put('/:authorId', updateAuthor)

router.delete('/:authorId', deleteAuthor)

router.post('/', createAuthor)

export default router
