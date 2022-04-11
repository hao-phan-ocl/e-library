import { Request, Response, NextFunction } from 'express'

import Book, { BookDocument } from '../models/Book'
import BookService from '../services/book'
import { BadRequestError } from '../helpers/apiError'

// POST /books
export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      title,
      authors,
      description,
      categories,
      language,
      image,
      publicationYear,
    } = req.body
    const book = new Book({
      title,
      authors,
      description,
      categories,
      language,
      image,
      publicationYear,
    })

    const createdBook = await BookService.create(book)
    await BookService.populateAuthor(createdBook) // this to add bookId to the referenced author as well
    res.status(201).json(createdBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const update = req.body as BookDocument
    const bookId = req.params.bookId
    const updatedBook = await BookService.updateBook(bookId, update)
    // await BookService.populateAuthor(updatedBook)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/:bookId
export async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await BookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books/:bookId
export async function findById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await BookService.findById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books/:title
export async function findByTitle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await BookService.findByTitle(req.params.title))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books
export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await BookService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
