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

    it('the body should be an object having property data on get all messages', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v2/messages')
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
    it('Should return sent messages', (done) => { // eslint-disable-line
        chai.request(server)// eslint-disable-line
            .get('/api/v2/messages/sent')
            .end((err, res) => {  // eslint-disable-line           
                res.body.should.have.property('data')
                    .which.is.an('array');
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
