const supertest = require('supertest');

describe('Test index returns json', function () {
    let server;
    let request;

    before(function () {
        server = require('../main/main');
        request = supertest.agent(server);
    });
    after(function (done) {
        server.close(done);
    });

    it('should respond with 200 and Hello World', function (done) {
        request
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, {"message": "Hello World!"})
            .end(function (err) {
                if (err) done(err);
                done();
            });
    });
});
