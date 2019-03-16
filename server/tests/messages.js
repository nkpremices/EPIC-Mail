import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);

const should = chai.should(); // eslint-disable-line
const sendMessageTemp = {
    sender: '',
    reciever: '',
    subject: 'subect',
    text: 'text',
    parentMessageId: 0,
    status: 'send',
};

describe('messages', () => {// eslint-disable-line
    const sender = {
        userName: 'deschant',
        password: 'password',
        email: 'deschant@epic.com',
    };
    const reciever = {
        userName: 'premices',
        password: 'password',
        email: 'premices@epic.com',
    };
    it('should have a signed user as a sender', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .send(sender)
            .end((err, res) => {
                sendMessageTemp.sender = res.body.data[0].token;
                res.body.should.be.an('Object');
                done();
            });
    });
    it('should have a signed user as a reciever', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .send(reciever)
            .end((err, res) => {
                sendMessageTemp.reciever = res.body.data[0].token;
                res.body.should.be.an('Object');
                done();
            });
    });
    it('the body should be an object on post', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/messages')
            .send(sendMessageTemp)
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('the body should be an object on get', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v1/messages')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
});
