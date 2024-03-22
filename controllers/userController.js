const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const ContactForm = require('./../models/contactFormSchema');
const Contents = require("../models/contentSchema")
const s3 = require("../models/s3Schema")

const EMAIL = 'dev.rahul.pradeep@gmail.com'
const PASSWORD = 'vfwk ctpl rcey cflr'

module.exports = {


  //NEWS LETTER
    subscribe: async (req, res) => {

        let {userEmail} = req.body;
        let config = {
            service : "gmail",
            auth : {
                user: EMAIL,
                pass: PASSWORD
            }
        }
        let transporter = nodemailer.createTransport(config);
        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: 'Mentoons',
                link: 'https://mailgen.js'
            }
        })

        let response ={
            body:{
                name: 'Mentoons Subscriber',
                intro: "Congratulations! 🎉",
                table: {
                  data: [
                    {
                      item: "Engaging Videos",
                      description: "Dive into a world of captivating visuals and immersive storytelling."
                    },
                    {
                      item: "Captivating Comics",
                      description: "Embark on thrilling adventures and meet unforgettable characters."
                    },
                    {
                      item: "Inspiring Podcasts",
                      description: "Unlock new insights and fuel your imagination with thought-provoking discussions."
                    }
                  ]
                },
                outro: "Thank you for choosing Mentoons. We're excited to have you onboard!",
              }
        }

        let mail = MailGenerator.generate(response)
        let message = {
            from : EMAIL,
            to : userEmail,
            subject: "Subcription",
            html: mail
        }

        transporter.sendMail(message).then(() =>{
            return res.status(201).json({msg:"Emial Sended."})
        }).catch(error =>{
            return req.status(500).json({error})
        })
   
    },

    //CONTACT

    contact: async (req, res) => {
      const { name, email, mobile, message } = req.body;
      try {
        await ContactForm.create({
          name : name ,
          email : email,
          mobile : mobile,
          message : message,
        })
        res.send("Form submitted successfully.");
      } catch (err) {
        console.log(err);
        res.status(500).send("Error submitting form.");
      }
    },


};
