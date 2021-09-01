/**
 * @desc    This file contain mongoDB configuration for connecting database
 * @author  Harshit Kishor
 * @since   2021
 */

const mongoose = require("mongoose");
const config = require("./config")
// Make connection to MongoDB
const connectToMongoDB = async () => {
    try {
        mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("Connected to MongoDB...");
    } catch (err) {
        console.error(err.message);
        // Terminate the application
        process.exit(1);
    }
};

module.exports = connectToMongoDB;