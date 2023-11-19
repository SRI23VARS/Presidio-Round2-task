const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    EmpId: Number,
    FullName: String,
    Age: Number,
    DOB: Date,
    Salary: Number,
    Department: String
})

const UserModel = mongoose.model("fullstack",UserScheme)
module.exports = UserModel