import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

// POST /users
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = new User(req.body)
    const createdUser = await UserService.create(user)
    res.status(201).json({
      message: 'User registered successfully',
      user: createdUser,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /users
export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body
    const loggedInUser = await UserService.loginUser(email)
    res.json({
      message: 'User logged in successfully',
      user: loggedInUser,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /users GOOGLE LOGIN
export async function googleLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as UserDocument
    const token = jwt.sign({ email: user?.email }, JWT_SECRET)
    res.json({ user, token })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /users
export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const update = req.body
    const user = req.user as UserDocument
    const updatedUser = await UserService.updateUser(user._id, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /users/add-books/
export async function addBook(req: Request, res: Response, next: NextFunction) {
  try {
    const { bookId } = req.body
    const user = req.user as UserDocument
    const updatedUser = await UserService.addBook(user?._id, bookId)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /users/remove-books/
export async function removeBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { bookId } = req.body
    const user = req.user as UserDocument
    const updatedUser = await UserService.removeBook(user._id, bookId)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /users
export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as UserDocument
    await UserService.deleteUser(user._id)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users/:userId
export async function findById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await UserService.findById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users
export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await UserService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /profile
export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as UserDocument
    res.json(await UserService.findById(user._id))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
