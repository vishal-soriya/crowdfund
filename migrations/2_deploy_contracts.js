const CampaignFactory = artifacts.require("CampaignFactory");
const Campaign = artifacts.require("Campaign");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

// let accounts;
// async () => {
//     accounts = await web3.eth.getAccounts();
// }

module.exports = function(deployer) {
    deployer.deploy(CampaignFactory);
    deployer.deploy(Campaign, 100, "0xad78aE4295B0d45aA9E98346a507d8D75fA7D9E6");
};

// method1 = (deployer) => {
//     deployer.deploy(CampaignFactory);
// }

// method2 = (deployer) => {
//     deployer.deploy(Campaign);
// }

// module.exports = {
//     method1, 
//     method2,
//     // anotherMethod
// };

// module.exports = {
//     method1 = function(deployer) {
//         deployer.deploy(CampaignFactory);
//     },
//     method2 = function(deployer) {
//         deployer.deploy(Campaign);
//     }
//     // deployer.deploy(Campaign);
// };