# Anonymous Twitter

demo URL: https://anon-twitter.vercel.app/tweets
- notes: because the api service is deployed to Heroku, so please be patient when you didn't see any data coming, as sometimes it might go into sleep. :)

## Prerequisites
1. [node.js](https://nodejs.org/en/download/) v14
2. yarn as the package manager, follow [the intruction](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) to install.
3. mongoDB

## File Structure
1. `twitter-api/` is the API service.
   Look into `twitterApi.yaml` for API details.
2. `web_ui/` is the frontend part.

## Build and Run

1. in `twitter-api/`

```
# make sure you have mongoDB.
# modify the connection info in `.env` or `app.js`.
yarn
PORT=3000 yarn start
```

2. `web_ui/`.
```
yarn
PORT=3001 yarn start
```

## Development
```
yarn devstart
```

### Test
```
yarn test
```

## Architecture Consideration
### DB selection
- Use MongoDB here as the data schema is extendible, so it will be more flexible to use NoSQL here. MongoDB is a document-based database here, so no need to pre-define the schema.
- Besides, based on the current requirements, didn't see a requirement on the ACID part, so that won't cause a problem for MongoDB, and would be easier to do horizontal scaling.
### Data model/Schema
- A tweet is basically
```
{
   id: <mongoDB's object ID>,
   content: "tweet content"
}
```

- A retweet is also a tweet (in the same collection)
```
{
   id: <mongoDB's object ID>,
   content: "" // empty
   retweet_id: <another tweet's object ID>
}
```
### How to scale for the "Top 10" requirement
- The current implementation just leverage mongoDB's aggregation feature (quite similar to group by in RDBMS term) to do a `group by retweet_id` operation, should be ok to support 1K or even 1M tweets.
- To support even higher number of tweets, may need to introduce a memcache like Redis to store the top 10 tweets. This would require us to have a writer service that would do the DB persitence and also write to the memcache. And then another service (Timeline) can read from the memcache.

## Tech. Notes
 - Leverage JavaScript for almost all implementations.
 - Use [prettier](https://prettier.io/), an auto-formatter for Javascript, to ensure the same coding style.

### [API Service](./twitter-api/)
- The API is defined with OpenAPI 3.0, as in `twitter-api/twitterApi.yaml`.
- In general, Leverage express generator as the boilerplate.
- Did not use DI(Dependency Injection), so this service would highly dependent on the DB layer.
- Ideally, the model layer should be able to be injected as a dependency.
- The test is more like integration test that involves with DB.
### [Web UI](./web_ui/)

- The UI part is implemented with [Next.js](https://nextjs.org/).
- Also use Material-UI for some UI building blocks.
- Didn't put too much emphasis here, so no tests and no input validation here.

## Future work
- Extract the model layer, and use DI as well.
- Add ESLint.
- Leverage some IoC container, like [awilix](https://github.com/jeffijoe/awilix) to make the configuration of DI more manageable.
- Enhance the error handling and add more test cases.
- Dockerize these 2 services.
