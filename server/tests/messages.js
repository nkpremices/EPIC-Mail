import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);

const should = chai.should(); // eslint-disable-line

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
    let senderToken;
    let recieverToken;
    it('should have a signed user as a sender', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .send(sender)
            .end((err, res) => {
                senderToken = res.body.data[0].token;
                res.body.should.be.an('Object');
                done();
            });
    });
    it('should have a signed user as a reciever', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .send(reciever)
            .end((err, res) => {
                recieverToken = res.body.data[0].token;
                res.body.should.be.an('Object');
                done();
            });
    });
    const sendMessageTemp = {
        sender: senderToken,
        reciever: recieverToken,
        subject: 'subect',
        parentMessageId: 0,
        status: 'send',
    };
    it('the body should be an object on post', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/messages')
            .send(sendMessageTemp)
            .end((err, res) => {
                res.body.should.be.an('Object');
                done();
            });
    });
    it('the body should be an object on get', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v1/auth/messages')
            .end((err, res) => {
                res.body.should.be.an('Object');
                done();
            });
    });
});
