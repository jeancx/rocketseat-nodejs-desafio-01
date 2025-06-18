process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../bin/www');
chai.use(chaiHttp);

describe('server starts', () => {
    it('loads server index', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                done();
            });
    });
});
