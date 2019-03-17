import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);

const should = chai.should(); // eslint-disable-line

// An object to initialize massages
const sendMessageTemp = {
    sender: '',
    reciever: '',
    subject: 'subect',
    text: 'text',
    parentMessageId: 0,
    status: 'send',
};

// An object to initialize the unread massages

const unreadSendMessageTemp = {
    sender: '',
    reciever: '',
    subject: 'subect',
    text: 'text',
    parentMessageId: 0,
    status: 'unread',
};
// An object to signup as a sender
const sender = {
    userName: 'deschant',
    password: 'password',
    email: 'deschant@epic.com',
};

// An object to signup as a reciever
const reciever = {
    userName: 'premices',
    password: 'password',
    email: 'premices@epic.com',
};

describe('messages', () => {// eslint-disable-line
    it('should have a signed user as a sender', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/auth/signup')
            .send(sender)
            .end((err, res) => {
                sendMessageTemp.sender = res.body.data[0].token;
                unreadSendMessageTemp.sender = res.body.data[0].token;
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
                unreadSendMessageTemp.reciever = res.body.data[0].token;
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
    it('the body should be an object on get all messages', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v1/messages')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('Should return message "empty" when there is no unread message', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v1/messages/unread')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('object').which.have
                    .property('message').which.is.a('string');
                done();
            });
    });
    it('should have an unread message before to display it', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v1/messages')
            .send(unreadSendMessageTemp)
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('Should return unread messages', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v1/messages/unread')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('Unread message should be an object', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v1/messages/unread')
            .end((err, res) => {  // eslint-disable-line           
                res.body.data[0].should.have.property('status', 'unread')
                    .which.is.a('string');
                done();
            });
    });
    it('Should return sent messages', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v1/messages/sent')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('a sent message should be an object', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v1/messages/sent')
            .end((err, res) => {  // eslint-disable-line           
                res.body.data[0].should.be.an('object');
                done();
            });
    });
});
