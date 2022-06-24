const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/projectdb',{ useNewUrlParser: true });
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    productId : Number,
    productName : String,
    description : String,
    expiryDate : Date,
    price : Number,
    imageUrl : String
});
var ItemData = mongoose.model('product-data', itemSchema);  
module.exports = ItemData;

