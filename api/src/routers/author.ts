import express from 'express'
import passport from 'passport'

import {
  findAll,
  findById,
  findByName,
  updateAuthor,
  deleteAuthor,
  createAuthor,
} from '../controllers/author'

const router = express.Router()
const authRequired = passport.authenticate('jwt', { session: false })

router.get('/all', findAll)
router.get('/id/:authorId', findById)
router.get('/name/:authorName', findByName)

router.put('/:authorId', authRequired, updateAuthor)

router.delete('/delete/:authorId', authRequired, deleteAuthor)

router.post('/create', authRequired, createAuthor)

export default router
