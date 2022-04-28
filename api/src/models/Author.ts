import mongoose, { Document, Schema } from 'mongoose'

export type AuthorDocument = Document & {
  name: string
  books?: mongoose.Types.ObjectId[]
}

export const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  { timestamps: true }
)

export default mongoose.model<AuthorDocument>('Author', authorSchema)
