var express = require('express');
var router = express.Router();

const TweetController = require('../controllers/TweetController');
const TweetModel = require('../models/Tweet');

var controller = new TweetController(TweetModel);

router.get('/', controller.getTimeline.bind(controller));
router.post('/', controller.create.bind(controller));
router.post('/retweet', controller.retweet.bind(controller));

module.exports = router;
