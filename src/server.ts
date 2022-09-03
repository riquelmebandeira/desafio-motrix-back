import app from './app'
import CurrentContentRouter from './routes/CurrentContentRouter'
import * as dotenv from 'dotenv'
dotenv.config()

app.express.use('/content', CurrentContentRouter)

app.express.listen(process.env.PORT, () => {
  console.log(`Servidor online na porta ${process.env.PORT}`)
})
