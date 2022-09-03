import mongoose from 'mongoose'
import CurrentContent from '../models/CurrentContent'
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
  await CurrentContent.deleteMany({})
  await CurrentContent.insertMany(mockContent)
}

seedDB().then(() => {
  mongoose.connection.close()
})
