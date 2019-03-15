import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);

const should = chai.should(); // eslint-disable-line

describe('signup', () => {// eslint-disable-line
    it('should return an object', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .end((err, res) => {
                res.body.should.be.an('Object');
                done();
            });
    });
    it('should have property data', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('object');
                done();
            });
    });
    it('should have property status', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('status');
                done();
            });
    });
    it('the data should be an object', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .end((err, res) => {  // eslint-disable-line           
                res.body.data.should.be.an('Object');
                done();
            });
    });
    it('the data should have proprety message on errors ', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .end((err, res) => {  // eslint-disable-line           
                res.body.data.should.have.property('message');
                done();
            });
    });
});
