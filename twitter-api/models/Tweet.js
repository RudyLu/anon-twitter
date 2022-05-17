var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema(
  {
    content: { type: String, trim: true },
    retweet_id: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    },
  },
  {
    timestamps: true,
  }
);

//Export model
module.exports = mongoose.model('Tweet', TweetSchema);
