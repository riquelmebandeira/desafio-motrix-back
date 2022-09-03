import app from './app'
import * as dotenv from 'dotenv'
dotenv.config()

app.express.listen(process.env.PORT, () => {
  console.log(`Servidor online na porta ${process.env.PORT}`)
})
