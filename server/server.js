const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const Resume = require("./models/resume");
const port = 4000;
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.use(cors());
app.use(bodyparser.json());

app.post("/signup", async (req, res) => {
  const user = req.body;

  const takenUsername = await User.findOne({ username: user?.username });
  const takenEmail = await User.findOne({ email: user?.email });

  if (takenUsername || takenEmail) {
    res.json({ message: "Username or email has already been taken" });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbuser = new User({
      username: user?.username?.toLowerCase(),
      email: user?.email?.toLowerCase(),
      contact: user?.contact,
      password: user?.password,
    });

    const registeredUser = dbuser.save();
    if (registeredUser) {
      res.json({ message: "Registered user successfully" });
    } else {
      res.status(400).json({ message: "Failed to register user" });
    }
  }
});

app.post("/login", (req, res) => {
  const userLogginIn = req.body;
  if (userLogginIn.isSocial) {
    return res.json({
      message: "Success!",
      token: "Bearer " + userLogginIn?.token,
      username: userLogginIn?.name,
      isSocial: userLogginIn?.isSocial,
    });
  } else {
    User.findOne({ username: userLogginIn.username }).then((dbuser) => {
      if (!dbuser) {
        return res.json({ message: "Invalid username or password!" });
      }
      bcrypt
        .compare(userLogginIn?.password, dbuser?.password)
        .then((isCorrect) => {
          if (isCorrect) {
            const payload = {
              id: dbuser?._id,
              username: dbuser?.username,
            };

            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: 86400 },
              (err, token) => {
                if (err) return res.json({ message: err });
                return res.json({
                  message: "Success!",
                  token: "Bearer " + token,
                  username: dbuser?.username,
                });
              }
            );
          } else {
            return res.status(400).json({
              message: "Invalid username or password",
            });
          }
        });
    });
  }
});

app.get("/getresume/:username", async (req, res) => {
  try {
    const currentUser = await Resume.find(req.params);
    return res
      .status(201)
      .json({ message: "Resumes fetched Successfully!", data: currentUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to fetch current user resume" });
  }
});

app.post("/add-cv-form", async (req, res) => {
  try {
    const { username, resume_data } = req.body;

    const newResume = new Resume({ username, resume_data });

    const savedResume = await newResume.save();
    return res
      .status(201)
      .json({ message: "Form data saved Successfully", data: savedResume });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to save form data" });
  }
});

app.get("/editcv/:id", async (req, res) => {
  try {
    const currentUser = await Resume.findOne({ _id: req.params.id });

    return res
      .status(201)
      .json({ message: "Form data fetched successfully", data: currentUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to fetch form data" });
  }
});

app.put("/editcv/:id", async (req, res) => {
  try {
    const { resume_data } = req.body;

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      { resume_data },
      { new: true }
    );

    res.status(201).json(updatedResume);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update resume" });
  }
});

app.delete("/deletecv/:id", async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id, {
      new: true,
    });

    res.status(201).json(deletedResume);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update resume" });
  }
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          isLoggedin: false,
          message: "Failed to authenticate",
        });
      }

      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res
      .status(400)
      .json({ message: "Incorrect Token Provided", isLoggedin: false });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ isLoggedin: true, username: req.user.username });
});

app.post("/api/create-checkout-session", async (req, res) => {
  const { product } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      },
    ],
    mode: "payment",
    success_url: product.redirect_to,
    cancel_url: "http://localhost:3002/",
  });

  res.json({ id: session.id, clientSecret: session.client_secret });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
