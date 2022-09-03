import { Document, model, Schema } from 'mongoose'

export interface ICurrentContent extends Document {
  title: string,
  body: string,
  revision: number,
}

const CurrentContentSchema = new Schema({
  title: String,
  body: String,
  revision: Number
}, {
  versionKey: false,
  timestamps: true
})

export default model<ICurrentContent>('CurrentContent', CurrentContentSchema)
