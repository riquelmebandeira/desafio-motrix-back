import { Request, Response } from 'express'
import CurrentContentService from '../services/CurrentContentService'
import StatusCode from '../utils/StatusCode'

class CurrentContentController {
  public async create (req: Request, res: Response): Promise<Response> {
    const newContent = await CurrentContentService.create({ ...req.body, revision: 1 })

    return res.status(StatusCode.OK).json(newContent)
  }

  public async getAll (req: Request, res: Response): Promise<Response> {
    const contents = await CurrentContentService.getAll()

    return res.status(StatusCode.OK).json(contents)
  }
}

export default new CurrentContentController()
