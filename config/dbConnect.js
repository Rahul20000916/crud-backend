const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`-----------------MongoDB Connected Succesfully to ${connected.connection.host}--------------------`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = { dbConnect };