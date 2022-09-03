import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

class App {
  public express: express.Application

  constructor () {
    this.express = express()

    this.middlewares()
    this.database()
  }

  private middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database () {
    mongoose.connect('mongodb://localhost:27017/desafioMotrix')
  }
}

export default new App()
