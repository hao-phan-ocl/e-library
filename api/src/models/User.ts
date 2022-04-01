import mongoose, { Document, Schema } from 'mongoose'

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
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    bookLists: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  { timestamps: true }
)

export default mongoose.model<UserDocument>('User', userSchema)
