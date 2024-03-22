const mongoose = require('mongoose');



const ContentSchema = new mongoose.Schema({
 
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});


const Content = mongoose.model('Content', ContentSchema);
module.exports = Content;
