const account1 = require("../../hidden.json").account1;
const Web3 = require('web3'); // version 1.0.0-beta.35
const Filestorage = require('@skalenetwork/filestorage.js');
const path = require("path");

async function downloadFileToDesktop(storagePath){
  //create web3 connection

  const web3Provider = new Web3.providers.HttpProvider(
        account1.skaleEndpoint
    );
  let web3 = new Web3(web3Provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your account & private key
  let account = account1.accountAddress;


  console.log("about to download ", storagePath)

  let files = await filestorage.downloadToBuffer(storagePath);

  return files
}

module.exports = function(filePath){
  return downloadFileToDesktop(
    path.join(account1.accountAddress.substring(2), filePath)
  );
}