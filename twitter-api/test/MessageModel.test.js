const { expect } = require('chai');
const Message = require('../models/Message');

const input = {
  intent: 'ping',
  messageContent: 'pong',
};

describe('Message Model Testing', () => {
  it('creates a message', async () => {
    const msg = new Message(input);
    var res = await msg.save();
    expect(res.intent).to.be.equal(input.intent);
    expect(res.messageContent).to.be.equal(input.messageContent);
  });

  it('deletes a message', async () => {
    const msg = new Message(input);
    var res = await msg.save();

    res = await Message.deleteOne({ intent: input.intent });
    expect(res.ok).to.be.equal(1);
    expect(res.deletedCount).to.be.equal(1);
  });

  it('can query after creating', async () => {
    const msg = new Message(input);
    var res = await msg.save();

    res = await Message.find({ intent: input.intent });
    expect(res[0].messageContent).to.be.equal(input.messageContent);
  });
});
