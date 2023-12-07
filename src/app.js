// const express = require("express");
import express from "express";
import web from "./routes/web.js";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || "8080";

app.set("view engine", "ejs");
app.set('views', join(__dirname, 'views'));
app.use("/", web);
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhavinpatel5638@gmail.com",
    pass: "rabrifhjlzpqmpwq",
  },
});

app.post("/send-email", (req, res) => {
  const { inputName, inputEmail, inputSubject, inputTextarea } = req.body;
  console.log(req.body);
  const mailOptions = {
    from: inputEmail,
    to: "bhavin.k@evolutioncloud.in",
    subject: inputSubject,
    text: `From: ${inputName}\nEmail: ${inputEmail}\n\n${inputTextarea}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
