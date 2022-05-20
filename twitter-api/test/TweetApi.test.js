const { expect } = require('chai');

const supertest = require('supertest');
const app = require('../app.js');

function genRandomString(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe('Testing twitter API - basic', () => {
  it('should create a tweet', async () => {
    var res = await supertest(app).post('/tweets').send({ content: 'pong' });

    expect(res.statusCode).to.be.equal(200);
    expect(res.body.result.content).to.be.equal('pong');
  });

  it('should fail when creating a tweet longer than 140 chars', async () => {
    var randomString = genRandomString(141);
    var res = await supertest(app)
      .post('/tweets')
      .send({ content: randomString });

    expect(res.statusCode).to.be.equal(400);
  });

  it('should fail when creating a tweet that is empty', async () => {
    var res = await supertest(app).post('/tweets').send({ content: '' });
    expect(res.statusCode).to.be.equal(400);
  });
});

describe('Testing twitter API - retweet', () => {
  it('should retweet a tweet', async () => {
    var res = await supertest(app).post('/tweets').send({ content: 'pong' });
    expect(res.statusCode).to.be.equal(200);

    var tweetId = res.body.result._id;

    res = await supertest(app)
      .post('/tweets/retweet')
      .send({ retweet_id: tweetId });
    expect(res.statusCode).to.be.equal(200);
  });

  it('should fail when retweet with an empty id', async () => {
    var res = await supertest(app)
      .post('/tweets/retweet')
      .send({ retweet_id: '' });
    expect(res.statusCode).to.be.equal(400);
  });

  it('should fail when retweet with an invalid id', async () => {
    var res = await supertest(app)
      .post('/tweets/retweet')
      .send({ retweet_id: '123' });
    expect(res.statusCode).to.be.equal(400);
  });

  it('should fail to retweet a retweet', async () => {
    var res = await supertest(app).post('/tweets').send({ content: 'pong' });
    expect(res.statusCode).to.be.equal(200);

    var retweetRes = await supertest(app)
      .post('/tweets/retweet')
      .send({ retweet_id: res.body.result._id });
    expect(res.statusCode).to.be.equal(200);

    res = await supertest(app)
      .post('/tweets/retweet')
      .send({ retweet_id: retweetRes.body.result._id });
    expect(res.statusCode).to.be.equal(400);
  });
});
