const { expect } = require('chai');

const supertest = require('supertest');
const app = require('../app.js');

describe('Testing translation API', () => {
  it('should create a message', async () => {
    var res = await supertest(app)
      .post('/translations')
      .send({ intent: 'ping', messageContent: 'pong' });

    expect(res.statusCode).to.be.equal(200);
    expect(res.body.result.intent).to.be.equal('ping');
    expect(res.body.result.messageContent).to.be.equal('pong');
  });

  it('should query message', async () => {
    var res = await supertest(app)
      .post('/translations')
      .send({ intent: 'ping', messageContent: 'pong' });

    res = await supertest(app).get('/translations?intent=ping');
    expect(res.statusCode).to.be.equal(200);
    expect(res.body.result).to.be.equal('pong');
  });

  it('should return 404 when querying non existing message', async () => {
    var res = await supertest(app).get('/translations?intent=ping');
    expect(res.statusCode).to.be.equal(404);
  });

  it('should delete message', async () => {
    var res = await supertest(app)
      .post('/translations')
      .send({ intent: 'ping', messageContent: 'pong' });

    res = await supertest(app).delete('/translations').send({ intent: 'ping' });
    expect(res.statusCode).to.be.equal(200);
    expect(res.body.result.ok).to.be.equal(1);
  });
});
