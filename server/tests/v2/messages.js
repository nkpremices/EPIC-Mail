import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';

chai.use(chaiHttp);

const should = chai.should(); // eslint-disable-line

// An object to initialize massages
const sendMessageTemp = {
    sender: 'deschant@epic.com',
    reciever: 'premices@epic.com',
    subject: 'subect',
    text: 'text',
    parentMessageId: 0,
    status: 'sent',
};

// An object to initialize the unread massages

const unreadSendMessageTemp = {
    sender: 'premices@epic.com',
    reciever: 'premices@epic.com',
    subject: 'subect',
    text: 'text',
    parentMessageId: 0,
    status: 'unread',
};

describe('messages', () => {// eslint-disable-line

    it('the body should be an object on post', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v2/messages')
            .send(sendMessageTemp)
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('the body should be an object on get all messages', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v2/messages')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('Should return message "empty" when there is no unread message', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v2/messages/unread')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('should have an unread message before to display it', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .post('/api/v2/messages')
            .send(unreadSendMessageTemp)
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('Should return unread messages', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v2/messages/unread')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('Unread message should be an object', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v2/messages/unread')
            .end((err, res) => {  // eslint-disable-line           
                res.body.data[0].should.have.property('isread', false)
                    .which.is.a('boolean');
                done();
            });
    });
    it('Should return sent messages', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v2/messages/sent')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('a sent message should be an object', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v2/messages/sent')
            .end((err, res) => {  // eslint-disable-line           
                res.body.data[0].should.be.an('object');
                done();
            });
    });
    it('Should return a requested messages', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v2/messages/1')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
                done();
            });
    });
    it('a requested message should be an empty array on error', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v2/messages/1')
            .end((err, res) => {  // eslint-disable-line           
                res.body.data.should.be.an('array');
                done();
            });
    });
    it('Should delete a requested message', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .delete('/api/v2/messages/1')
            .end((err, res) => {  // eslint-disable-line           
                res.body.data.should.be.a('array').with.property('length', 1);
                done();
            });
    });
});
