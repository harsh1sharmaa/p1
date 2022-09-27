

const MongoClient = require('mongodb').MongoClient;
// const { connection_string } = require('./environment_variables');

class Connection {
  static async open() {
    if (this.conn) return this.conn;
    this.conn = await MongoClient.connect('mongodb://root:cedcommerce@127.0.0.1:27017/');
    return this.conn;
  }
}

Connection.conn = null;
// Connection.url = connection_string;

module.exports = { Connection };
// const mongoose = require('mongoose')

// const connection = async () => {

//    await mongoose.connect('mongodb://root:cedcommerce@127.0.0.1:27017/')
//    console.log("connected");
//     const ProductSchema=new mongoose.Schema({
//         name: String,
//         email: String
//     });


//       const products = mongoose.model('products', ProductSchema);

//       let product = new products({email:"prodddd",name: 3546,price: 10});

//     let result=await product.save();

//     console.log(result)

// }

// module.exports ={connection}

// const {MongoClient}=require('mongodb');
// const client=new MongoClient('mongodb://root:cedcommerce@127.0.0.1:27017/');

// async function getconn() {

//   let conn=await client.connect();
//   let db=conn.db("test")
//   return db
// }

// module.exports ={getconn}


