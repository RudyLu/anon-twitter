var Mongoose = require('mongoose');

const TOP_TIMELINE_COUNT = 10;

class TweetController {
  constructor(TweetModel) {
    this.TweetModel = TweetModel;
  }

  async create(req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
      if (!req.body.content) {
        throw new Error('content cannot be empty');
      }

      if (req.body.content.length > 140) {
        throw new Error('each tweet should be under 140 characters');
      }

      const tweet = new this.TweetModel({ content: req.body.content });
      await tweet.save();

      return res.status(200).json({
        status: 200,
        result: tweet,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }

  async retweet(req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
      var retweetId = req.body.retweet_id;
      console.log('reweet with: ', retweetId);

      if (!retweetId || !Mongoose.isValidObjectId(retweetId)) {
        throw new Error('cannot retweet with an invalid ID');
      }

      var tweet = await this.TweetModel.findOne({
        _id: Mongoose.Types.ObjectId(retweetId),
      });

      if (!tweet) {
        throw new Error('cannot retweet an non-existent tweet');
      }

      // HACK: consider an empty tweet here as a retweet
      if (!tweet.content) {
        throw new Error('cannot retweet an retweet');
      }

      const message = new this.TweetModel({ retweet_id: retweetId });
      await message.save();

      return res.status(200).json({
        status: 200,
        result: message,
      });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ status: 400, message: e.message });
    }
  }

  // get top 10 tweets, order by the number of retweets.
  async getTimeline(req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
      var message = await this.TweetModel.aggregate([
        {
          $group: {
            _id: { $ifNull: ['$retweet_id', '$_id'] },
            count: { $sum: 1 },
          },
        },

        { $sort: { count: -1 } },
        // Optionally limit results
        { $limit: TOP_TIMELINE_COUNT },
        {
          $lookup: {
            from: 'tweets',
            localField: '_id',
            foreignField: '_id',
            as: 'content',
          },
        },
      ]);

      if (message.length == 0) {
        return res.status(404).json({
          status: 404,
          result: 'Not found',
        });
      }

      return res.status(200).json({
        status: 200,
        result: message,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }
}

module.exports = TweetController;
