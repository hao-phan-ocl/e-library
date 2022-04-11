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

router.delete('/delete/:authorId', deleteAuthor)

router.post('/create', createAuthor)

export default router
