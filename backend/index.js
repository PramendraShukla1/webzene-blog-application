const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
dotenv.config();
const User = require("./models/User");
const Post = require("./models/Post");
const port = 4000;
const mongo_url = process.env.MONGO_DB_URL;
const uploadMiddleware = multer({ dest: "uploads/" });

//! CORS Connection

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

//? Express server connection

app.listen(port || 4001, () => {
  console.log(`server is running on port ${port}`);
});

//? MongoDB Connection and Bcrypt js

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(`Error in database conection and error message is ${err}`);
  });

const salt = bcrypt.genSaltSync(15);
const secretKey = process.env.JSON_WEB_TOKEN;

//! Register authrization

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (err) {
    console.log(`something wrong with register api ${err}`);
    res.status(400).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email: email });

    if (!userDoc) {
      // User not found
      return res.status(400).json("User not found");
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign(
        { email: email, id: userDoc._id, username: userDoc.username },
        secretKey,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            id: userDoc._id,
            username: userDoc.username,
            email: email,
          });
        }
      );
    } else {
      // Incorrect password
      res.status(400).json("Wrong Credentials");
    }
  } catch (err) {
    console.log(`Error in login API: ${err}`);
    res.status(500).json("Internal Server Error");
  }
});


//! Cookie/Profile authrization

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  jwt.verify(token, secretKey, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    res.json(info);
  });
});


//! Logout function

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

//! Post Function endpoint
app.post(
  "/post",
  uploadMiddleware.fields([
    { name: "file", maxCount: 1 },
    { name: "profilePic", maxCount: 1 },
  ]),
  async (req, res) => {
    const { file, profilePic } = req.files;
    const { originalname: fileOriginalName, path: filePath } = file[0];
    const { originalname: profilePicOriginalName, path: profilePicPath } =
      profilePic[0];

    const fileParts = fileOriginalName.split(".");
    const fileExt = fileParts[fileParts.length - 1];
    const newFilePath = filePath + "." + fileExt;
    fs.renameSync(filePath, newFilePath);

    const profilePicParts = profilePicOriginalName.split(".");
    const profilePicExt = profilePicParts[profilePicParts.length - 1];
    const newProfilePicPath = profilePicPath + "." + profilePicExt;
    fs.renameSync(profilePicPath, newProfilePicPath);

    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newFilePath,
        profilePic: newProfilePicPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  }
);

// app.put(
//   "/post",
//   uploadMiddleware.fields([
//     { name: "file", maxCount: 1 },
//     { name: "profilePic", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     const { token } = req.cookies;

//     jwt.verify(token, secretKey, {}, async (err, info) => {
//       if (err) throw err;
//       const { id, title, summary, content,cover,profilePic } = req.body;
//       const postDoc = await Post.findById(id);
//       const isAuthor =
//         JSON.stringify(postDoc.author) === JSON.stringify(info.id);
//       res.json({ isAuthor, postDoc, info });
//       if (!isAuthor) {
//         return res
//           .status(400)
//           .json("Sorry you are not the author of this post.");
//       }
//       await postDoc.update({ title, summary, content,cover: postDoc.cover ,profilePic: postDoc.profilePic});

//       //res.json(postDoc)
//     });
//   }
// );

//! Get All Post Endpoint
app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(posts);
  } catch (error) {
    console.error(`Error in /post endpoint: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//! Get Single Post Endpoint

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});
