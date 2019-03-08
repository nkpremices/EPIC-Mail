const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../routes/index');// eslint-disable-line

chai.use(chaiHttp);

const should = chai.should();// eslint-disable-line

describe('Todo', () => {// eslint-disable-line
    it('should return an array', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/')
            .end((err, res) => {
                res.body.should.be.an('Object');
                done();
            });
    });

    it('should have property todo', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('todo');
                done();
            });
    });
});
