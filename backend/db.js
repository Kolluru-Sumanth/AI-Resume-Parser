const { default: mongoose, Schema } = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL);

const db_schema=new Schema({
    name: String,
    skills: Array,
    preferences: String
});
const User=mongoose.model('Resume',db_schema);
module.exports=User;