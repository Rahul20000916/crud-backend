const jwt = require("jsonwebtoken");
const Contents = require("../models/contentSchema");
const s3 = require("../models/s3Schema");
const Content = require("../models/contentSchema");
const Contact = require("../models/contactFormSchema");

const ADMIN_EMAIL = "admin@mentoons.com";
const ADMIN_PASSWORD = "admin";

module.exports = {
  doAdminLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({
          status: "ok",
          auth: true,
          admintoken: token,
          admin: { email: email },
        });
      } else {
        res.json({
          status: "error",
          auth: false,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ auth: false, message: "Internal server error" });
    }
  },

  doAddProduct: async (req, res) => {
    try {
      console.log(req.body, req.file, "hehe");
      const response = await s3.uploadFile(req.file);
      if (response) {
        await Contents.create({
          title: req.body.title,
          category: req.body.category,
          file: response.source.Location,
        });
        res.send("Product added Scuccessfully!!");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error");
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const contents = await Contents.find({});
      res.json(contents);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedContent = await Contents.findByIdAndDelete(id);

      if (!deletedContent) {
        return res.status(404).send("Content not found");
      }

      res.send("Content deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },

  getProduct: async (req, res) => {
    try {
        const id = req.params.id;
        const content = await Content.findOne({_id: id});
        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }
        const { title, category } = content;
        const modifiedData = {
            title: title,
            category: category
        };
        res.json(modifiedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
},

  
  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, category } = req.body;
      await Content.findByIdAndUpdate(id, { title, category });
      res.json({ message: "Content updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getMail: async (req, res) => {
    try {
      const messages = await Contact.find({});
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  deleteMail:async (req, res) => {
    try {
      const { id } = req.params;
      await Contact.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
