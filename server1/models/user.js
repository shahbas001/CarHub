const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/projectdb',{ useNewUrlParser: true });
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : String,
    email : String,
    userName:String,
    number :String,
    password : String,
    usertype : String
});
var UserData = mongoose.model('user-data', userSchema);  
module.exports = UserData;

