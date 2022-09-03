import { Document, model, Schema } from 'mongoose'

interface IContentLog extends Document {
  id: string,
  title: string,
  body: string,
  revision: number,
  createdAt: string,
  updatedAt: string,
}

const ContentLogSchema = new Schema({
  id: String,
  title: String,
  body: String,
  revision: Number,
  createdAt: String,
  updatedAt: String
}, {
  versionKey: false,
  collection: 'content_logs'
})

export default model<IContentLog>('ContentLog', ContentLogSchema)
