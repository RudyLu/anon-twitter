const TOP_TIMELINE_COUNT = 10;

class TweetController {
  constructor(TweetModel) {
    this.TweetModel = TweetModel;
  }

  async query(req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
      var message = await this.TweetModel.find({ intent: req.query.intent });

      if (message.length == 0) {
        return res.status(404).json({
          status: 404,
          result: 'Not found',
        });
      }

      var resMsg = message[0].messageContent;

      return res.status(200).json({
        status: 200,
        result: resMsg,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }

  async create(req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
      const message = new this.TweetModel(req.body);
      await message.save();

      return res.status(200).json({
        status: 200,
        result: message,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }

  async retweet(req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
      var retweetId = req.body.retweet_id;
      const message = new this.TweetModel({ retweet_id: retweetId });
      await message.save();

      return res.status(200).json({
        status: 200,
        result: message,
      });
    } catch (e) {
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
