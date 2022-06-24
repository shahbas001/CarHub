const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/projectdb', { useNewUrlParser: true } )


const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    
    itemId: String,
    itemName :String,
    itemImage :String,
    itemPrice:Number,
    quantity: Number,
});
const cartSchema = new Schema({
    userId: String,
    cartItem: [ItemSchema],
});
var CartModel= mongoose.model('cart',cartSchema);
module.exports=CartModel;