import Content from '../models/Content'
import Sinon from 'sinon'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../server'
import { Response } from 'superagent'
import ContentLog from '../models/ContentLog'

chai.use(chaiHttp)

describe('Quando requisitada, a rota GET /contents', () => {
  let response: Response

  before(async () => {
    Sinon.stub(Content, 'find')
      .resolves([])

    response = await chai
      .request(app)
      .get('/contents')
  })

  after(() => {
    (Content.find as Sinon.SinonStub).restore()
  })

  it('Deve retornar o status 200', () => {
    expect(response).to.have.a.status(200)
  })

  it('Deve conter um array no corpo da resposta', () => {
    expect(response.body).to.be.a('array')
  })
})

describe('Quando requisitada, a rota POST /contents', () => {
  let response: Response

  before(async () => {
    Sinon.stub(Content, 'create')
      .resolves({
        title: 'mock title',
        body: 'mock body'
      })

    response = await chai
      .request(app)
      .post('/contents')
      .send({
        title: 'mock title',
        body: 'mock body'
      })
  })

  after(() => {
    (Content.create as Sinon.SinonStub).restore()
  })

  it('Deve retornar o status 201', () => {
    expect(response).to.have.a.status(201)
  })

  it('Deve retornar o conteúdo criado no corpo da resposta', () => {
    expect(response.body).to.be.a('object')
    expect(response.body).to.have.deep.property('title', 'mock title')
    expect(response.body).to.have.deep.property('body', 'mock body')
  })
})

describe('Quando requisitada, a rota PUT /contents/:id', () => {
  let response: Response

  before(async () => {
    Sinon.stub(Content, 'findOne').resolves({})
    Sinon.stub(ContentLog, 'create').resolves({})

    Sinon.stub(Content, 'findOneAndUpdate')
      .resolves({
        title: 'new title',
        body: 'new body'
      })

    response = await chai
      .request(app)
      .put('/contents/fakeId')
      .send({
        title: 'new title',
        body: 'new body'
      })
  })

  after(() => {
    (
      Content.findOne as Sinon.SinonStub,
      ContentLog.create as Sinon.SinonStub,
      Content.findOneAndUpdate as Sinon.SinonStub
    ).restore()
  })

  it('Deve retornar o status 201', () => {
    expect(response).to.have.a.status(200)
  })

  it('Deve retornar o conteúdo atualizado no corpo da resposta', () => {
    expect(response.body).to.be.a('object')
    expect(response.body).to.have.deep.property('title', 'new title')
    expect(response.body).to.have.deep.property('body', 'new body')
  })
})

describe('Quando requisitada, a rota DELETE /contents/:id', () => {
  let response: Response

  before(async () => {
    Sinon.stub(ContentLog, 'deleteMany')
      .resolves({ acknowledged: true, deletedCount: 1 })

    Sinon.stub(Content, 'findOneAndDelete').resolves({
      title: 'title',
      body: 'content'
    })

    response = await chai
      .request(app)
      .delete('/contents/fakeId')
  })

  after(() => {
    (
      ContentLog.deleteMany as Sinon.SinonStub,
      Content.findOneAndDelete as Sinon.SinonStub
    ).restore()
  })

  it('Deve retornar o status 200', () => {
    expect(response).to.have.status(200)
  })

  it('Deve retornar o conteúdo deletado', () => {
    expect(response.body).to.have.deep.property('title', 'title')
    expect(response.body).to.have.deep.property('body', 'content')
  })
})
