const account1 = require("../../hidden.json").account1;
const Web3 = require('web3'); // version 1.0.0-beta.35
const Filestorage = require('@skalenetwork/filestorage.js');
const path = require("path");

async function getFiles(storagePath){
  console.log("run getFiles:", storagePath);

  //create web3 connection

  const web3Provider = new Web3.providers.HttpProvider(
        account1.skaleEndpoint
    );
  console.log("web3 provider")

  let web3 = new Web3(web3Provider);
  console.log("web3")

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);
  console.log("filestorage")

  //const basePath = web3.utils.stripHexPrefix(account1.accountAddress);
    const basePath = account1.accountAddress;
  //provide your account & private key
  let account = account1.accountAddress;
  let files = await filestorage.listDirectory(storagePath);
  console.log("files")
  return files
}


module.exports = function(folderPath){
  return getFiles(path.join(account1.accountAddress.substring(2), folderPath));
}