import app from './app'
import CurrentContentRouter from './routes/ContentRouter'
import * as dotenv from 'dotenv'
import errorMiddleware from './middlewares/errorMiddleware'
dotenv.config()

app.express.use('/contents', CurrentContentRouter)
app.express.use(errorMiddleware)

const server = app.express.listen(process.env.PORT, () => {
  console.log(`Servidor online na porta ${process.env.PORT}`)
})

export default server
