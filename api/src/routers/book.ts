import express from 'express'
import passport from 'passport'

import {
  findAll,
  findById,
  updateBook,
  deleteBook,
  createBook,
  findByTitle,
  findByAuthorId,
} from '../controllers/book'

const router = express.Router()
const authRequired = passport.authenticate('jwt', { session: false })

// remember to add / before any url
router.get('/all', findAll)
router.get('/id/:bookId', findById)
router.get('/title/:title', findByTitle)
router.get('/author-id/:authorId', findByAuthorId)

router.put('/update/:bookId', authRequired, updateBook)

router.delete('/:bookId', authRequired, deleteBook)

router.post('/create', authRequired, createBook)

export default router
