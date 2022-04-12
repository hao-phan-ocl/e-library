import express from 'express'
import passport from 'passport'

import {
  findAll,
  findById,
  updateBook,
  deleteBook,
  createBook,
  findByTitle,
} from '../controllers/book'

const router = express.Router()
const authRequired = passport.authenticate('jwt', { session: false })

router.get('/all', findAll)
router.get('/id/:bookId', findById)
router.get('/title/:title', findByTitle)

router.put('/update/:bookId', updateBook)

router.delete('/:bookId', authRequired, deleteBook)

router.post('/create', createBook)

export default router
