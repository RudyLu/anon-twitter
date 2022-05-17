const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/translations_test';

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
    console.warn('Error : ', error);
  });

//Called hooks which runs before something.
beforeEach((done) => {
  mongoose.connection.collections.messages.drop(() => {
    //this function runs after the drop is completed
    done(); //go ahead everything is done now.
  });
});
