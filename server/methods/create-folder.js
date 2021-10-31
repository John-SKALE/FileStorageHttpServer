const account1 = require("../../hidden.json").account1;
const Web3 = require('web3');
const Filestorage = require('@skalenetwork/filestorage.js');

async function createDirectory(directoryPath) {
    //create web3 connection
    const web3Provider = new Web3.providers.HttpProvider(
        account1.skaleEndpoint
    );
    console.log("web3provider")
    let web3 = new Web3(web3Provider);
    console.log("web3")


    //get filestorage instance
    let filestorage = new Filestorage(web3, true);
    // let filestorage = new Filestorage(web3Provider, true);
    console.log("filestorage")

    //provide your account & private key
    //note this must include the 0x prefix
    let privateKey = account1.privateKey;
    let account = account1.accountAddress;

    if(directoryPath.substring(0, 1) === "/"){
        // directoryPath = account1.accountAddress.substring(2) + directoryPath;
        directoryPath = directoryPath.substring(1);
    }

    console.log("create folder:", directoryPath)


    const result = await filestorage.createDirectory(account, directoryPath, privateKey);

    console.log("create directory")

    return result;
}

module.exports = createDirectory