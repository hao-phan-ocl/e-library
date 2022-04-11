import Book from '../models/Book'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import Author, { AuthorDocument } from '../models/Author'

async function create(author: AuthorDocument) {
  const foundAuthor = await Author.find({
    name: { $regex: author.name, $options: 'i' },
  })

  if (foundAuthor) {
    throw new BadRequestError('Author existed')
  }

  return await author.save()
}

async function findAll() {
  return await Author.find()
}

async function findById(authorId: string) {
  const foundAuthor = await Author.findById(authorId)

  if (!foundAuthor) {
    throw new NotFoundError('Author not found')
  }

  return foundAuthor
}

async function findByName(authorName: string) {
  const foundAuthor = await Author.find({
    name: { $regex: authorName, $options: 'i' },
  })

  if (!foundAuthor.length) {
    throw new NotFoundError('Author not found')
  }

  return foundAuthor
}

async function deleteAuthor(authorId: string) {
  const foundAuthor = await Author.findByIdAndDelete(authorId)

  if (!foundAuthor) {
    throw new NotFoundError('Author not found')
  }

  foundAuthor.books?.forEach(async (book) => {
    await Book.findByIdAndUpdate(book, { $pull: { authors: authorId } })
  })
}

async function updateAuthor(authorId: string, update: Partial<AuthorDocument>) {
  const foundAuthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
  })

  if (!foundAuthor) {
    throw new NotFoundError('Author not found')
  }

  return foundAuthor
}

export default {
  create,
  findAll,
  findById,
  deleteAuthor,
  updateAuthor,
  findByName,
}
