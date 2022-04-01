import { Request, Response, NextFunction } from 'express'

import Author from '../models/Author'
import AuthorService from '../services/author'
import { BadRequestError } from '../helpers/apiError'

// POST /authors
export async function createAuthor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.body
    const author = new Author({ name })
    const createdAuthor = await AuthorService.create(author)
    res.status(201).json(createdAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /authors/:authorId
export async function updateAuthor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const update = req.body
    const authorId = req.params.authorId
    const updatedAuthor = await AuthorService.updateAuthor(authorId, update)
    res.json(updatedAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /authors/:authorId
export async function deleteAuthor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await AuthorService.deleteAuthor(req.params.authorId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /id/:authorId
export async function findById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await AuthorService.findById(req.params.authorId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /name/:authorName
export async function findByName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await AuthorService.findByName(req.params.authorName))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /authors
export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await AuthorService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
