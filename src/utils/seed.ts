import mongoose from 'mongoose'
import Content from '../models/Content'
import ContentLog from '../models/ContentLog'
import mockContent from './mockContent'

mongoose
  .connect('mongodb://localhost:27017/desafioMotrix')
  .then(() => {
    console.log('Mongo Connection Open!')
  })
  .catch((err) => {
    console.log(err)
  })

const seedDB = async () => {
  await ContentLog.deleteMany({})
  await Content.deleteMany({})
  await Content.insertMany(mockContent)
}

seedDB().then(() => {
  mongoose.connection.close()
})
