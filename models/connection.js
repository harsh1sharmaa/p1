
const mongoose = require('mongoose')

const connection = async () => {

   await mongoose.connect('mongodb://root:cedcommerce@127.0.0.1:27017/');
    // const ProductSchema=new mongoose.Schema({
    //     name: String,
    //     email: String
    // });


    //   const products = mongoose.model('products', ProductSchema);

    //   let product = new products({email:"prodddd",name: 3546,price: 10});

    // let result=await product.save();

    // console.log(result)

}
