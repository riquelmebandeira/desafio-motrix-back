import { Document, model, Schema } from 'mongoose'

export interface IContent extends Document {
  title: string,
  body: string,
  revision: number,
}

const ContentSchema = new Schema({
  title: String,
  body: String,
  revision: Number
}, {
  versionKey: false,
  timestamps: true
})

export default model<IContent>('Content', ContentSchema)
