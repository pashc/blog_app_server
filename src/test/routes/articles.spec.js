const expect = require('chai').expect,
  supertest = require('supertest'),
  Article = require('../../main/models/article')

const articles = [
  {
    author: 'author1',
    slug: 'some-awesome-title-1',
    title: 'Some Awesome Title 1',
    content: 'Some Awesome Content 1'
  }, {
    author: 'author2',
    slug: 'some-awesome-title-2',
    title: 'Some Awesome Title 2',
    content: 'Some Awesome Content 2'
  }
]

beforeEach((done) => {
  Article.remove({})
    .then(() => {
      return Article.insertMany(articles)
    })
    .then(() => {
      done()
    })
})

describe('Test requesting articles', () => {
  let server
  let request

  before(() => {
    server = require('../../main/main')
    request = supertest.agent(server)
  })
  after((done) => {
    server.close(done)
  })

  it('should return all articles', (done) => {
    request
      .get('/api/articles')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.length).to.be.eq(2)
        expect(res.body[0].author).to.be.eq('author1')
        expect(res.body[0].slug).to.be.eq('some-awesome-title-1')
        expect(res.body[0].title).to.be.eq('Some Awesome Title 1')
        expect(res.body[0].content).to.be.eq('Some Awesome Content 1')
        expect(res.body[1].author).to.be.eq('author2')
        expect(res.body[1].slug).to.be.eq('some-awesome-title-2')
        expect(res.body[1].title).to.be.eq('Some Awesome Title 2')
        expect(res.body[1].content).to.be.eq('Some Awesome Content 2')
      })
      .end(done)
  })

  it('should return an article by slug', (done) => {
    request
      .get('/api/articles/some-awesome-title-2')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.author).to.be.eq('author2')
        expect(res.body.slug).to.be.eq('some-awesome-title-2')
        expect(res.body.title).to.be.eq('Some Awesome Title 2')
        expect(res.body.content).to.be.eq('Some Awesome Content 2')
      })
      .end(done)
  })

  it('should return error if no article was found', (done) => {
    request
      .get('/api/articles/unknown-slug')
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.error).to.be.eq('article could not be found')
      })
      .end(done)
  })
})


