import Content, { IContent } from '../models/Content'
import ContentLog from '../models/ContentLog'
import CustomError from '../utils/CustomError'
import StatusCode from '../utils/StatusCode'

class ContentService {
  public async create (content: IContent): Promise<IContent> {
    return Content.create(content)
  }

  public async getAll (): Promise<IContent[]> {
    return Content.find()
  }

  public async getOne (id: string): Promise<IContent | null> {
    const content = Content.findOne({ id })

    if (!content) {
      throw new CustomError(
        StatusCode.NOT_FOUND, 'This content id does not exist.'
      )
    }

    return content
  }

  public async updateOne (id: string, title: string, body: string): Promise<IContent> {
    const currentContent = await Content.findOne({ _id: id }, null, { lean: true })

    if (!currentContent) {
      throw new CustomError(
        StatusCode.NOT_FOUND, 'This content id does not exist.'
      )
    }

    const { _id, ...data } = currentContent

    // Salva o conteúdo antigo na coleção 'content_logs'.
    // Guarda o id original no documento
    // Para poder recuperar todas as atualizações deste mesmo conteúdo.
    await ContentLog.create({ id: _id, ...data })

    // Atualiza o conteúdo para a versão mais recente.
    return Content.findOneAndUpdate(
      { _id: id }, { title, body }, { new: true }
    ) as unknown as IContent
  }

  public async deleteOne (id: string) {
    await ContentLog.deleteMany({ id })
    return Content.findOneAndDelete({ _id: id })
  }
}

export default new ContentService()
