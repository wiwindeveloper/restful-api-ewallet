const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();
// const mysql       = require('mysql');
//import modul ether
var ethers        = require('ethers');  
var crypto        = require('crypto');
//import modul tron
const TronWeb = require('tronweb')
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { "TRON-PRO-API-KEY": '2329d118-c2dd-4875-ac0f-cdcb4770d368' }
})

 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'restful_db'
// });
 
//connect to database
// conn.connect((err) =>{
//   if(err) throw err;
//   console.log('Mysql Connected...');
// });

//get ethers wallet
app.get('/api/etherswallet',(req, res) => {
  var id          = crypto.randomBytes(32).toString('hex');
  var privateKey  = "0x"+id;
  var wallet      = new ethers.Wallet(privateKey);
  var walletAddress = wallet.address;
  res.send(JSON.stringify({"status": 200, "error": null, "privatekey": privateKey, "address": walletAddress}));
});

//get tron wallet
app.get('/api/tronwallet', (req, res) => {
  const tronWallet = tronWeb.createAccount()
  Promise.all([tronWallet]).then((values) => {
    var privateKey = values[0].privateKey;
    var publicKey  = values[0].publicKey;
    var addressBase58 = values[0].address.base58;
    var addressHex = values[0].address.hex;

    res.send(JSON.stringify({"status": 200, "error": null, "privatekey": privateKey, "publicKey": publicKey, "addressBase58" : addressBase58, "addressHex" : addressHex}));
  });
})

//tampilkan semua data product
// app.get('/api/products',(req, res) => {
//   let sql = "SELECT * FROM product";
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });
 
// //tampilkan data product berdasarkan id
// app.get('/api/products/:id',(req, res) => {
//   let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });
 
// //Tambahkan data product baru
// app.post('/api/products',(req, res) => {
//   let data = {product_name: req.body.product_name, product_price: req.body.product_price};
//   let sql = "INSERT INTO product SET ?";
//   let query = conn.query(sql, data,(err, results) => {
//     if(err) throw err;
//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });
 
// //Edit data product berdasarkan id
// app.put('/api/products/:id',(req, res) => {
//   let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });
 
// //Delete data product berdasarkan id
// app.delete('/api/products/:id',(req, res) => {
//   let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//       res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });
 
//Server listening
// app.listen(3000,() =>{
//   console.log('Server started on port 3000...');
// });
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});