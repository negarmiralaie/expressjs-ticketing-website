const mongoose = require('mongoose');

const connectDB = async ()  => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to db');
        });

        mongoose.connection.on('error',(err) => {
            console.log(err.message)
        });

        mongoose.connection.on('disconnected',() => {
            console.log('Mongoose connection is disconnected.')
        });

        // process.on('SIGINT', () => {
            // mongoose.connection.close(() => {
                // console.log('Mongoose connection is disconnected through app termination');
                // process.exit(0);
            // });
        // })

    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;