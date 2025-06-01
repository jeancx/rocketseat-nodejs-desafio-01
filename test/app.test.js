process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
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

