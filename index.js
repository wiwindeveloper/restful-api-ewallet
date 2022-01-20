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

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");

 
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

//get tron usdt balance
app.get('/api/tronwallet/:id/:private',(req, res) => {
  const privateKey  = req.params.private;
  const tronPrivate = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
  const CONTRACT    = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  const ACCOUNT     = req.params.id;

  async function main() {
    const {
        abi
    } = await tronPrivate.trx.getContract(CONTRACT);

    const contract = tronPrivate.contract(abi.entrys, CONTRACT);

    const balance = await contract.methods.balanceOf(ACCOUNT).call();
    
    const results = balance.toString();

    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  }

  main();
});

app.get('/api/trc20transfer/:private/:to/:value',(req, res) => {
  const privateKey  = req.params.private;
  const tronWeb     = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

  async function triggerSmartContract() {
    const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; //contract address

    var toaddress              = req.params.to;
    var value                  = req.params.value;

    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
        // These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
        let result = await contract.transfer(
            toaddress, //address _to
            value   //amount
        ).send({
            feeLimit: 1000000
        }).then(output => {
          console.log('- Output:', output, '\n');
          res.send(JSON.stringify({"status": 200, "response": output}));
        });
        
        // console.log('result: ', result);
    } catch(error) {
        // console.error("trigger smart contract error",error)
      res.send(JSON.stringify({"status": 300, "error": "trigger smart contract error", "response": error}));
    }
  }
  
  triggerSmartContract();
});

app.get('/api/samplejson',(req, res) => {
    let data = {
      "datatable": 
        {
          "data": [
            [
              "MTM",
              "2022-01-01",
              "14.00",
              "15.20",
              "13.70",
              "13.70",
              "43818",
              "0.0",
              "1.0",
              "14.00",
              "15.20",
              "13.70",
              "13.70",
              "43818"
            ],
            [
              "MTM",
              "2022-01-02",
              "13.70",
              "15.00",
              "13.50",
              "15.00",
              "29726",
              "0.0",
              "1.0",
              "13.70",
              "15.00",
              "13.50",
              "15.00",
              "29726"
            ],
            [
              "MTM",
              "2022-01-03",
              "13.80",
              "13.90",
              "13.50",
              "13.50",
              "53682",
              "0.0",
              "1.0",
              "13.80",
              "13.90",
              "13.50",
              "13.50",
              "53682"
            ],
            [
              "MTM",
              "2022-01-04",
              "13.50",
              "13.90",
              "12.00",
              "11.60",
              "43299",
              "0.0",
              "1.0",
              "13.50",
              "13.90",
              "12.00",
              "11.60",
              "43299"
            ],
            [
              "MTM",
              "2022-01-05",
              "12.00",
              "12.13",
              "11.40",
              "11.60",
              "2300",
              "0.0",
              "1.0",
              "12.00",
              "12.13",
              "11.40",
              "11.60",
              "2300"
            ],
            [
              "MTM",
              "2022-01-06",
              "12.00",
              "12.40",
              "11.50",
              "12.00",
              "23320",
              "0.0",
              "1.0",
              "12.00",
              "12.40",
              "11.50",
              "12.00",
              "23320"
            ],
            [
              "MTM",
              "2022-01-07",
              "13.10",
              "13.10",
              "11.50",
              "11.50",
              "188756",
              "0.0",
              "1.0",
              "13.10",
              "13.10",
              "11.50",
              "11.50",
              "188756"
            ],
            [
              "MTM",
              "2022-01-08",
              "11.50",
              "12.00",
              "11.30",
              "11.50",
              "1500",
              "0.0",
              "1.0",
              "11.50",
              "12.00",
              "11.30",
              "11.50",
              "1500"
            ],
            [
              "MTM", 
              "2022-01-09",
              "10.09",
              "10.40",
              "10.03",
              "10.05",
              "109541",
              "0.0",
              "1.0",
              "10.09",
              "10.40",
              "10.03",
              "10.05",
              "109541"
            ],
            [
              "MTM",
              "2022-01-10",
              "10.00",
              "15.70",
              "10.00",
              "15.70",
              "581993",
              "0.0",
              "1.0",
              "10.00",
              "15.70",
              "10.00",
              "15.70",
              "581993"
            ],
            [
              "MTM",
              "2022-01-11",
              "10.20",
              "10.20",
              "10.00",
              "10.00",
              "65912",
              "0.0",
              "1.0",
              "10.20",
              "10.20",
              "10.00",
              "10.00",
              "65912"
            ]
          ],
        "columns": [
          {
              "name": "ticker",
              "type": "String"
          },
          {
              "name": "date",
              "type": "Date"
          },
          {
              "name": "open",
              "type": "BigDecimal(34,12)"
          },
          {
              "name": "high",
              "type": "BigDecimal(34,12)"
          },
          {
              "name": "low",
              "type": "BigDecimal(34,12)"
          },
          {
              "name": "close",
              "type": "BigDecimal(34,12)"
          },
          {
              "name": "volume",
              "type": "BigDecimal(37,15)"
          },
          {
              "name": "ex-dividend",
              "type": "BigDecimal(42,20)"
          },
          {
              "name": "split_ratio",
              "type": "double"
          },
          {
              "name": "adj_open",
              "type": "BigDecimal(50,28)"
          },
          {
              "name": "adj_high",
              "type": "BigDecimal(50,28)"
          },
          {
              "name": "adj_low",
              "type": "BigDecimal(50,28)"
          },
          {
              "name": "adj_close",
              "type": "BigDecimal(50,28)"
          },
          {
              "name": "adj_volume",
              "type": "double"
          }
      ]
      },
      "meta": {
          "next_cursor_id": null
      }
  };

    res.send(JSON.stringify(data));
});

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