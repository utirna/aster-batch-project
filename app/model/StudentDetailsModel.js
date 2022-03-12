/*
import mongoose
create schema
create a model 
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentDetailsSchema = new Schema({
  name: { type: String },
  course: { type: String },
});

const StudentDetailsModel = mongoose.model(
  "student_detail",
  StudentDetailsSchema
);

module.exports = StudentDetailsModel;
