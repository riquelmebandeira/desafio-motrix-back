import { Request, Response } from 'express'
import ContentService from '../services/ContentService'
import StatusCode from '../utils/StatusCode'

interface Query {
  offset: string,
  limit: string
}

class ContentController {
  public async create (req: Request, res: Response): Promise<Response> {
    const newContent = await ContentService.create({ ...req.body, revision: 1 })
    return res.status(StatusCode.CREATED).json(newContent)
  }

  public async getAll (req: Request<{}, {}, {}, Query>, res: Response): Promise<Response> {
    const { offset, limit } = req.query

    if (offset && limit) {
      const start = parseInt(offset)
      const end = start + parseInt(limit)
      let contents = await ContentService.getAll()
      const totalContents = contents.length
      contents = contents.slice(start, end)
      return res.status(StatusCode.OK).json({ totalContents, contents })
    }

    const contents = await ContentService.getAll()
    return res.status(StatusCode.OK).json(contents)
  }

  public async getOne (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const content = await ContentService.getOne(id)
    return res.status(StatusCode.OK).json(content)
  }

  public async getLogs (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const content = await ContentService.getOne(id)
    const logs = await ContentService.getLogs(id)
    return res.status(StatusCode.OK).json([...logs, content])
  }

  public async updateOne (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { title, body } = req.body
    const updatedContent = await ContentService.updateOne(id, title, body)
    return res.status(StatusCode.OK).json(updatedContent)
  }

  public async deleteOne (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deletedContent = await ContentService.deleteOne(id)
    return res.status(StatusCode.OK).json(deletedContent)
  }

  public async deleteMany (req: Request, res: Response): Promise<Response> {
    const ids = req.body
    const deletedContent = await ContentService.deleteMany(ids)
    return res.status(StatusCode.OK).json(deletedContent)
  }
}

export default new ContentController()
