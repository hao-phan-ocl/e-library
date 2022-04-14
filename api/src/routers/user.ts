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
  getProfile,
} from '../controllers/user'

const router = express.Router()
const authRequired = passport.authenticate('jwt', { session: false })

router.get('/all', authRequired, findAll)
router.get('/id/:userId', authRequired, findById)
router.get('/profile', authRequired, getProfile)

router.put('/update', authRequired, updateUser)
router.put('/add-favorite', authRequired, addBook)
router.put('/delete-favorite', authRequired, removeBook)

router.delete('/delete', authRequired, deleteUser)

router.post('/register', createUser)
router.post('/login', loginUser)
router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }), // implementing token-based instead of session-based auth
  googleLogin
)

export default router
