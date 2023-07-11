const express = require("express");
const qrcode = require("qrcode-terminal");
const puppeteer = require("puppeteer");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { Client, MessageMedia, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--unhandled-rejections=strict",
    ],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

app.get("/send", (req, res) => {
  const groupId = process.env.GROUP_ID;
  const { message } = req.body;

  console.log("MESSAGE:", message);

  try {
    const result = client.sendMessage(groupId, message);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/ping", (req, res) => {
  const groupId = process.env.GROUP_ID;
  const { message } = req.body;

  console.log("MESSAGE:", message);

  try {
    const result = client.sendMessage(groupId, message);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
