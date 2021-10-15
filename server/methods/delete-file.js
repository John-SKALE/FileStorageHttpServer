const account1 = require("../../hidden.json").account1;
const Web3 = require('web3'); // version 1.0.0-beta.35
const Filestorage = require('@skalenetwork/filestorage.js');

async function deleteFile(filePath) {
  //create web3 connection
  const web3Provider = new Web3.providers.HttpProvider(
    account1.skaleEndpoint
  );
  let web3 = new Web3(web3Provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your account & private key
  //note this must include the 0x prefix
  let privateKey = account1.privateKey;
  let account = account1.accountAddress;

  await filestorage.deleteFile(account, filePath, privateKey);
}

module.exports = deleteFile