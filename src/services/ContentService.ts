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

  public async updateOne (id: string, title: string, body: string) {
    const currentContent = await Content.findOne({ _id: id }).lean()

    if (!currentContent) throw new CustomError(StatusCode.NOT_FOUND, 'This content id does not exist.')

    const { _id, ...data } = currentContent

    // Salva o conteúdo antigo na coleção 'content_logs'.
    // Cria a variável 'id' com o valor do documento original
    // Para poder recuperar todas as atualizações deste mesmo conteúdo.
    await ContentLog.create({ id: _id, ...data })

    // Atualiza a coleção 'contents' para a versão mais recente do conteúdo.
    return Content.findOneAndUpdate({ _id: id }, { title, body }, { new: true })
  }
}

export default new ContentService()
