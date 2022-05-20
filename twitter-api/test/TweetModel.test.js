const { expect } = require('chai');
const Tweet = require('../models/Tweet');

const input = {
  content: 'this is a tweet content',
};

describe('Message Model Testing', () => {
  it('creates a tweet', async () => {
    const tweet = new Tweet(input);
    var res = await tweet.save();
    expect(res.content).to.be.equal(input.content);
  });

  it('creates a retweet', async () => {
    const tweet = new Tweet(input);
    var res = await tweet.save();
    const retweet = new Tweet({retweet_id: res.id});
    var retweetRes = await retweet.save();
    expect(retweetRes.retweet_id.toString()).to.be.equal(res.id);
  });

  it('can query after creating', async () => {
    const tweet = new Tweet(input);
    var res = await tweet.save();

    res = await Tweet.find({ content: input.content });
    expect(res[0].content).to.be.equal(input.content);
  });
});
