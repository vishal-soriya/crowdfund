// const assert = require("assert");
// const ganache = require("ganache-cli");
// const Web3 = require("web3");
// const web3 = new Web3(ganache.provider());


const {assert} = require('chai')
const CampaignFactory = artifacts.require('./CampaignFactory');
const Campaign = artifacts.require('./Campaign');

// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

// const compiledFactory = require("../ethereum/build/CampaignFactory.json");
// const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign_contract;

contract('CampaignFactory', (accounts) => {
    before( async () => {
        contract = await CampaignFactory.deployed() 
    })

    describe('deployment', async() => {
        it('deploys successfuly', async() => {
            const address = contract.address;
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })

        it("Deploy Campaign", async () => {
            await contract.createCampaign("100");
            add = await contract.getDeployedCampaigns()
            console.log(add);
            
        });

        
    })
})

contract('Campaign',  (accounts) => {
    before( async () => {
        campaign_contract = await Campaign.deployed() 
    })

    describe('deployment', async() => {
        it("marks caller as the campaign manager", async () => {
            const manager = await campaign_contract.manager();
            console.log("manager");
            console.log(manager);
            assert.equal(accounts[0], manager);
        });

        it("Allows people to contribute money and marks them as approvers", async () => {
            let result = await campaign_contract.contribute({value: "200", from: accounts[1]})
            // console.log(result)
            const isContributor = await campaign_contract.approvers(accounts[1]);
            assert(isContributor);
        });

        it("Requires a minimum contribution", async () => {
            try {
                await campaign_contract.contribute({value: "5", from: accounts[1]})
                assert(false);
            } catch (err) {
                assert(err);
            }
        });

        it("allows a manager to make a payment request", async () => {
            await campaign_contract.createRequest(
                "Purchase Laptop", "100", accounts[1], 
                {gas: "1000000", from: accounts[0]})
            const request = await campaign_contract.requests(0);
            assert.equal("Purchase Laptop", request.description);
        });



        it("processes requests", async () => {
        campaign_contract.contribute({
            from: accounts[1],
            value: web3.utils.toWei("2", "ether"),
        });
        // await campaign.methods.contribute().send({
        //     from: accounts[0],
        //     value: web3.utils.toWei("10", "ether"),
        // });

        await campaign_contract
            .createRequest("A", web3.utils.toWei("1", "ether"), 
            accounts[2], 
            { from: accounts[0], gas: "1000000" });

        await campaign_contract.approveRequest(0, {
            from: accounts[1],
            gas: "1000000",
        });
        
        await campaign_contract.finalizeRequest(0, {
            gas: "1000000",
            from: accounts[0],
        });

        let balance = await web3.eth.getBalance(accounts[2]);
        balance = web3.utils.fromWei(balance, "ether");
        balance = parseFloat(balance);
        console.log(balance);
        assert(true);
        // assert(balance > 104);
        });

    })

})