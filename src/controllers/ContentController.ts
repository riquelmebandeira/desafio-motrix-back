import { Request, Response } from 'express'
import ContentService from '../services/ContentService'
import StatusCode from '../utils/StatusCode'

class ContentController {
  public async create (req: Request, res: Response): Promise<Response> {
    const newContent = await ContentService.create({ ...req.body, revision: 1 })

    return res.status(StatusCode.CREATED).json(newContent)
  }

  public async getAll (req: Request, res: Response): Promise<Response> {
    const contents = await ContentService.getAll()

    return res.status(StatusCode.OK).json(contents)
  }

  public async updateOne (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { title, body } = req.body

    const updatedContent = await ContentService.updateOne(id, title, body)

    return res.status(StatusCode.OK).json(updatedContent)
  }
}

export default new ContentController()
