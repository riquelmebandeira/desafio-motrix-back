import CurrentContentModel, { ICurrentContent } from '../models/CurrentContent'

class CurrentContentService {
  public async create (content: ICurrentContent): Promise<ICurrentContent> {
    return CurrentContentModel.create(content)
  }
}

export default new CurrentContentService()
