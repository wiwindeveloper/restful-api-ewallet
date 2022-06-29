// const TronWeb = require('tronweb');
// const HttpProvider = TronWeb.providers.HttpProvider;
// const fullNode = new HttpProvider("https://api.trongrid.io");
// const solidityNode = new HttpProvider("https://api.trongrid.io");
// const eventServer = new HttpProvider("https://api.trongrid.io");
// const privateKey = "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
// const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


// const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

// const ACCOUNT = "TEQH6py1Pi8YHNgi9cPMHCKLboBTUZrsYT";

// async function main() {
//     const {
//         abi
//     } = await tronWeb.trx.getContract(CONTRACT);
//     // console.log(JSON.stringify(abi));

//     const contract = tronWeb.contract(abi.entrys, CONTRACT);

//     const balance = await contract.methods.balanceOf(ACCOUNT).call();
//     console.log("balance:", balance.toString());

//     const resp = await contract.methods.transfer(ACCOUNT, 1).send();
//     console.log("transfer:", resp);
// }

// main().then(() => {
//     console.log("ok");
// })
// .catch((err) => {
//     console.log("error:", err);
// });


// const TronWeb = require('tronweb')

// const HttpProvider = TronWeb.providers.HttpProvider;
// const fullNode = new HttpProvider("https://api.trongrid.io");
// const solidityNode = new HttpProvider("https://api.trongrid.io");
// const eventServer = new HttpProvider("https://api.trongrid.io");
// const privateKey = "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
// const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

// async function triggerSmartContract() {
//     // Address B transfers 10 USDT from address A to C: B calls transferFrom (A, C, 10)
//     const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";//contract address
//     const value = 1000000;
//     try {
//         let contract = await tronWeb.contract().at(trc20ContractAddress);
//         //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
//         // These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
//         await contract.transferFrom(
//             "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL", //address _from
//             "TB2X4fWVXXuVCAcDjL52sUsaP2wwzCaVzq", //address _to
//             value //amount
//         ).send({
//             feeLimit: 1000000
//         }).then(output => {
//             console.log('- Output:', output, '\n');
//         });
//     } catch(error) {
//         console.error("trigger smart contract error",error)
//     }
// }

// triggerSmartContract();

const TronWeb = require('tronweb')

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

async function triggerSmartContract() {
    // const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";//contract address
    const trc20ContractAddress = "TQQg4EL8o1BSeKJY4MJ8TB8XK7xufxFBvK";
    var toaddress = "TB2X4fWVXXuVCAcDjL52sUsaP2wwzCaVzq";
    var value = 1000000;

    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
        // These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
        let result = await contract.transfer(
            toaddress, //address _to
            value   //amount
        ).send({
            feeLimit: 1000000
        }).then(output => {console.log('- Output:', output, '\n');});
        console.log('result: ', result);
    } catch(error) {
        console.error("trigger smart contract error",error)
    }
}

triggerSmartContract();



