import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';

chai.use(chaiHttp);

const should = chai.should(); // eslint-disable-line
const user = {
    userName: 'deschant',
    password: 'password',
    email: 'deschant@epic.com',
};
const userLog = {
    userName: 'deschant',
    password: 'password',
};

describe('signup', () => {// eslint-disable-line
    it('should return an object', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                res.body.should.be.an('Object');
                done();
            });
    });
    it('should have property data', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('should have property status equal to 200', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('status', 200);
                done();
            });
    });
    it('the data should have proprety message on errors ', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {  // eslint-disable-line           
                res.body.data[0].should.be.an('object')
                    .which.have.property('token').which.is.a('String');
                done();
            });
    });
});

describe('sign in', () => {// eslint-disable-line
    it('should sign in only signed up users', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                res.body.should.be.an('Object')
                    .with.property('data').which.is
                    .an('array');
                done();
            });
    });
    it('should have property data', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/login')
            .send(userLog)
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('should have property status', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/login')
            .send(userLog)
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('status', 200)
                    .which.is.an('number');
                done();
            });
    });
    it('the data should have proprety token ', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/login')
            .send(userLog)
            .end((err, res) => {  // eslint-disable-line           
                res.body.data[0].should.be.an('object')
                    .which.have.property('token').which.is.a('String');
                done();
            });
    });
});
