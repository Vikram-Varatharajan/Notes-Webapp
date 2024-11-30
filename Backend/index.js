const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;

const config = require("./config.json");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(config.connectionString);

const jwt = require("jsonwebtoken");

const { authenticateToken } = require("./utilities");

const { UnorderedBulkOperation } = require("mongodb");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

const User = require("./models/users.models");

// Create Account

app.post("/create-account", async (req, res) => {
  const { fullname, email, password, confirmpassword } = req.body;

  // Input validation
  if (!fullname) {
    return res.status(400).json({ error: true, message: "Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }
  if (password !== confirmpassword) {
    return res
      .status(400)
      .json({ error: true, message: "Passwords do not match" });
  }

  // Check if user exists
  const isUser = await User.findOne({ email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }

  // Create and save the user
  const user = new User({
    fullName: fullname,
    email,
    password,
  });

  await user.save();

  // Generate JWT token
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_SECRET_TOKEN,
    {
      expiresIn: "3600m", // 60 hours token expiry
    }
  );

  return res.status(201).json({
    error: false,
    user: { fullName: user.fullName, email: user.email, _id: user._id },
    accessToken,
    message: "Registered Successfully",
  });
});

// Login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  // Check if the user exists
  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  if (userInfo.password === password) {
    const accessToken = jwt.sign(
      { userId: userInfo._id },
      process.env.ACCESS_SECRET_TOKEN,
      {
        expiresIn: "3600m", // 60 hours token expiry
      }
    );

    return res.json({
      error: false,
      message: "Login successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials",
    });
  }
});

// Get  users

app.get("/get-user", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  // Fetch user from the database
  const user = await User.findById(userId);

  if (!user) {
    return res.status(401).json({ error: true, message: "User not found" });
  }

  return res.json({
    user: {
      fullName: user.fullName,
      email: user.email,
      _id: user._id,
      createdOn: user.createdOn,
    },
    message: "Successfully retrieved user data",
  });
});

// Add Note
const Note = require("./models/notes.models");

app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const addnote = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is Required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is Required" });
  }


  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: addnote.userId,
    });
    await note.save();
    return res.status(200).json({
      error: false,
      message: "Note added successfully",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Edit Note

app.put("/edit-note/:noteid", authenticateToken, async (req, res) => {
  const noteid = req.params.noteid;
  const { title, content, tags, isPinned } = req.body;
  const editnote  = req.user;

  if (!title && !content && !tags && isPinned === undefined) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteid, userId:editnote.userId });

    if (!note) {
      return res
        .status(404)
        .json({ error: true, message: "Notebook not found" });
    }

    let updated = false;

    if (title && title !== note.title) {
      note.title = title;
      updated = true;
    }
    if (content && content !== note.content) {
      note.content = content;
      updated = true;
    }
    if (tags && JSON.stringify(tags) !== JSON.stringify(note.tags)) {
      note.tags = tags;
      updated = true;
    }
    if (isPinned !== undefined && isPinned !== note.isPinned) {
      note.isPinned = isPinned;
      updated = true;
    }

    if (!updated) {
      return res.status(200).json({
        error: false,
        message: "No changes made, data is the same.",
      });
    }

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Notebook updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

//Get ALL Notes

app.get("/get-all-notes/", authenticateToken, async (req, res) => {
  const getnote = req.user;

  try {
    const notes = await Note.find({ userId: getnote.userId }).sort({ isPinned: -1 });

    return res.json({ error: false, notes, message: "Retreival Successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// Delete Note

app.delete("/delete-note/:noteid", authenticateToken, async (req, res) => {
  const noteId = req.params.noteid;
  const deletenote = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId:deletenote.userId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await Note.deleteOne({ _id: noteId, userId: deletenote.userId });

    return res.json({ error: false, message: "Note Deleted Successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// Update IsPinned Value

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteid = req.params.noteId;
  const { isPinned } = req.body;
  const IsPinnedvalue = req.user;

  try {
    const note = await Note.findOne({ _id: noteid, userId: IsPinnedvalue.userId});

    if (!note) {
      return res
        .status(404)
        .json({ error: true, message: "Notebook not found" });
    }

    if (isPinned) note.isPinned = isPinned || false;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Notebook updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
