import { Router } from 'express'
import rescue from 'express-rescue'
import ContentController from '../controllers/ContentController'
import validateContent from '../middlewares/validateContent'

const routes = Router()

routes.post('/', validateContent, rescue(ContentController.create as any))
routes.get('/', rescue(ContentController.getAll as any))
routes.put('/:id', validateContent, rescue(ContentController.updateOne as any))
routes.delete('/:id', rescue(ContentController.deleteOne as any))

export default routes
