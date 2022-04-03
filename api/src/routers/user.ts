import express from 'express'
import passport from 'passport'

import {
  createUser,
  findById,
  deleteUser,
  findAll,
  updateUser,
  loginUser,
  addBook,
  removeBook,
  googleLogin,
} from '../controllers/user'

const router = express.Router()
const authRequired = passport.authenticate('jwt', { session: false })

router.get('/all', findAll)
router.get('/id/:userId', authRequired, findById)

router.put('/id/:userId', authRequired, updateUser)
router.put('/add-books', addBook)
router.put('/delete-books', removeBook)

router.delete('/:userId', authRequired, deleteUser)

router.post('/register', createUser)
router.post('/login', loginUser)
router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }), // implementing token-based instead of session-based auth
  googleLogin
)

export default router
