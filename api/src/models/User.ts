import mongoose, { Document, Schema } from 'mongoose'
import Email from 'mongoose-type-email'

export type UserDocument = Document & {
  // username: string
  // password?: string
  firstName: string
  lastName: string
  email: string
  bookLists?: mongoose.Types.ObjectId[]
}

export const userSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   index: true,
    //   required: true,
    //   unique: true,
    // },
    // password: { type: String },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: Email,
      correctTld: true,
      unique: true,
      required: true,
    },
    bookLists: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  { timestamps: true }
)

export default mongoose.model<UserDocument>('User', userSchema)
