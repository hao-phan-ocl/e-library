import Author from '../models/Author'
import { NotFoundError } from '../helpers/apiError'
import Book, { BookDocument } from '../models/Book'

async function create(book: BookDocument) {
  return await book.save()
}

async function populateAuthor(book: BookDocument) {
  book.authors.forEach(async (author) => {
    await Author.findByIdAndUpdate(author, {
      $push: { books: book },
    })
  })
}

async function findAll() {
  return await Book.find().populate('authors', 'name')
}

async function findById(bookId: string) {
  const foundBook = await Book.findById(bookId).populate('authors', 'name')

  if (!foundBook) {
    throw new NotFoundError('Book not found')
  }

  return foundBook
}

async function findByTitle(title: string) {
  const foundBook = await Book.find({ title: { $regex: title, $options: 'i' } })

  if (!foundBook.length) {
    throw new NotFoundError('Book not found')
  }

  return foundBook
}

async function deleteBook(bookId: string) {
  const foundBook = await Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError('Book not found')
  }

  foundBook.authors.forEach(async (author) => {
    await Author.findByIdAndUpdate(author, { $pull: { books: bookId } })
  })
}

async function updateBook(bookId: string, update: Partial<BookDocument>) {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError('Book not found')
  }

  return foundBook
}

export default {
  create,
  findAll,
  findById,
  deleteBook,
  updateBook,
  findByTitle,
  populateAuthor,
}
