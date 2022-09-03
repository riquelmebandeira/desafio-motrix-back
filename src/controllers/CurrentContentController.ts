import { Request, Response } from 'express'
import CurrentContentService from '../services/CurrentContentService'
import StatusCode from '../utils/StatusCode'

class CurrentContentController {
  public async create (req: Request, res: Response): Promise<Response> {
    const newContent = await CurrentContentService.create({ ...req.body, revision: 1 })

    return res.status(StatusCode.OK).json(newContent)
  }
}

export default new CurrentContentController()
