require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = "Users";

// 🔹 **Signup Endpoint**
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = await dynamoDB.get({
    TableName: USERS_TABLE,
    Key: { UserId: email },
  }).promise();

  if (existingUser.Item) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user in DynamoDB
  const params = {
    TableName: USERS_TABLE,
    Item: { UserId: email, Password: hashedPassword },
  };

  await dynamoDB.put(params).promise();
  res.status(201).json({ message: "User registered successfully" });
});

// 🔹 **Login Endpoint**
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await dynamoDB.get({
    TableName: USERS_TABLE,
    Key: { UserId: email },
  }).promise();

  if (!result.Item) {
    return res.status(400).json({ error: "User not found" });
  }

  const isValid = await bcrypt.compare(password, result.Item.Password);
  if (!isValid) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1h" });

  res.json({ token });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
