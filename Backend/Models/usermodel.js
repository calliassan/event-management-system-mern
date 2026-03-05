const express = require("express");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
});
const usermodel = mongoose.model("eventuser", userSchema);
module.exports = usermodel;
