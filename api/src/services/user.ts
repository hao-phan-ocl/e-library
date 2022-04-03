import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError'
import User, { UserDocument } from '../models/User'
import Book from '../models/Book'

// Register user
async function create(user: UserDocument) {
  // const existedUsername = await User.findOne({ username: user.username })
  // const existedEmail = await User.findOne({ email: user.email })

  // if (existedUsername) {
  //   throw new InternalServerError('Username existed')
  // } else if (existedEmail) {
  //   throw new InternalServerError('Email existed')
  // }

  // Hasing password with bcryptjs
  // const salt = await bcrypt.genSalt(10)
  // user.password = await bcrypt.hash(user.password, salt)

  const existedEmail = await User.findOne({ email: user.email })
  if (existedEmail) throw new InternalServerError('Email existed')

  return await user.save()
}

// Login user
async function loginUser(enteredEmail: string) {
  // Checking email
  const foundUser = await User.findOne({ email: enteredEmail })
  if (!foundUser) {
    throw new UnauthorizedError('Invalid email')
  }

  // Checking password
  // const pwCheck = await bcrypt.compare(enteredPassword, foundUser.password)
  // if (!pwCheck) {
  //   throw new UnauthorizedError('Invalid password')
  // }

  return foundUser
}

// Find all users
async function findAll() {
  return await User.find().populate('bookLists', 'title')
}

// Find single user
async function findById(userId: string) {
  const foundUser = await User.findById(userId).populate('bookLists', 'title')

  if (!foundUser) {
    throw new NotFoundError('User not found')
  }

  return foundUser
}

// Find by email
async function findByEmail(email: string) {
  const foundUser = await User.findOne({ email: email }).populate(
    'bookLists',
    'title'
  )

  if (!foundUser) {
    throw new NotFoundError('User not found')
  }

  return foundUser
}

// Find or create
async function findOrCreate(parsedToken: any) {
  const {
    given_name: firstName,
    family_name: lastName,
    email,
  } = parsedToken.payload

  const foundUser = await User.findOne({ email: email })

  if (!foundUser) {
    return await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
    })
  }

  return foundUser
}

// Add to bookList
async function addBook(userId: string, bookId: string) {
  const foundUser = await User.findById(userId)
  const foundBook = await Book.findById(bookId)

  if (!foundUser) throw new NotFoundError('User not found')
  if (!foundBook) throw new NotFoundError('Book not found')

  const existed = await User.exists({ bookLists: foundBook._id })

  if (existed) {
    throw new InternalServerError('Book already added')
  }

  foundUser.bookLists?.push(foundBook._id)
  foundBook.readers?.push(foundUser._id)

  foundUser.save()
  foundBook.save()

  return foundUser
}

// Remove from bookList
async function removeBook(userId: string, bookId: string) {
  const foundUser = await User.findById(userId)
  const foundBook = await Book.findById(bookId)

  if (!foundUser) throw new NotFoundError('User not found')
  if (!foundBook) throw new NotFoundError('Book not found')

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { bookLists: bookId } },
    { new: true }
  )

  await Book.findByIdAndUpdate(bookId, { $pull: { readers: userId } })

  return updatedUser
}

// Delete user
async function deleteUser(userId: string) {
  const foundUser = await User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError('User not found')
  }

  foundUser.bookLists?.forEach(async (book) => {
    await Book.findByIdAndUpdate(book, { $pull: { readers: userId } })
  })
}

// Update user
async function updateUser(userId: string, update: Partial<UserDocument>) {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError('User not found')
  }

  return foundUser
}

export default {
  create,
  findAll,
  findById,
  deleteUser,
  updateUser,
  loginUser,
  addBook,
  removeBook,
  findOrCreate,
  findByEmail,
}
