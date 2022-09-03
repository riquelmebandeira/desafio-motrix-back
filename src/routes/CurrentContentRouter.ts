import { Router } from 'express'
import rescue from 'express-rescue'
import CurrentContentController from '../controllers/CurrentContentController'
import validateContent from '../middlewares/validateContent'

const routes = Router()

routes.post('/', validateContent, rescue(CurrentContentController.create as any))

export default routes
