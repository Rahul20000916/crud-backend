const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactForm = mongoose.model('ContactForm', ContactFormSchema);
module.exports = ContactForm;
