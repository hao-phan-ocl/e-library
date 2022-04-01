import mongoose, { Document, Schema } from 'mongoose'

export type BookDocument = Document & {
  title: string
  authors: mongoose.Types.ObjectId[]
  description: string
  categories: string[]
  language: string
  publicationYear: number
  image: string
  readers?: mongoose.Types.ObjectId[]
}

export const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    authors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
      },
    ],
    description: { type: String, required: true },
    categories: [{ type: String, requried: true }],
    language: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    image: { type: String, required: true },
    readers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

export default mongoose.model<BookDocument>('Book', bookSchema)
