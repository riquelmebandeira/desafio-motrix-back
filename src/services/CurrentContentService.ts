import CurrentContentModel, { ICurrentContent } from '../models/CurrentContent'

class CurrentContentService {
  public async create (content: ICurrentContent): Promise<ICurrentContent> {
    return CurrentContentModel.create(content)
  }

  public async getAll (): Promise<ICurrentContent[]> {
    return CurrentContentModel.find()
  }
}

export default new CurrentContentService()
