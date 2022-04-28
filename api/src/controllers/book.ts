import { Request, Response, NextFunction } from 'express'

import Book, { BookDocument } from '../models/Book'
import BookService from '../services/book'
import { BadRequestError } from '../helpers/apiError'

// POST /books/create
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
    res.status(201).json(createdBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /books/update/:bookId
export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const update = req.body as BookDocument
    const bookId = req.params.bookId
    const updatedBook = await BookService.updateBook(bookId, update)
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

// GET /books/id/:bookId
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

// GET /books/title/:title
export async function findByTitle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.params.title)
    res.json(await BookService.findByTitle(req.params.title))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books/author-id/:authorId
export async function findByAuthorId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await BookService.findByAuthorId(req.params.authorId))
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
