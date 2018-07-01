const supertest = require('supertest')

describe('Test index returns json', () => {
    let server
    let request

    before(() => {
        server = require('../main/main')
        request = supertest.agent(server)
      }
    )
    after((done) => {
      server.close(done)
    })

    it('should respond with 200 and Hello World', (done) => {
      request
        .get('/api')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, {'message': 'Hello World!'})
        .end((err) => {
          if (err) done(err)
          done()
        })
    })
  }
)
