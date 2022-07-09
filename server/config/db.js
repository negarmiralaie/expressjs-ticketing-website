const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to db');
    });

    mongoose.connection.on('error', (err) => {
      console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection is disconnected.');
    });

    // This event is called whenever you press ctrl+c to stop your app
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      // waits untill app is stopped then disconnected event is called
      process.exit(0);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
