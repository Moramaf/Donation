const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("solidity-coverage");

task("changeOwner", "change an owner")
.addParam("account", "The account address of new owner")
.setAction(async (taskArgs)=> {
  const Donation = await ethers.getContractFactory("Donation");
  await Donation.changeOwner(taskArgs.account);
  console.log(`new owner ${taskArgs.account}`);
});

task("withdraw", "withdraw to the account")
.addParam("account", "The account address you want to withdraw to")
.setAction(async (taskArgs)=> {
  const Donation = await ethers.getContractFactory("Donation");
  await Donation.withdraw(taskArgs.account);
  console.log(`Balance has been withdraw to ${taskArgs.account}`);
});

task("getdonators", "get full list of donators", async ()=> {
  const Donation = await ethers.getContractFactory("Donation");
  const alldonators = await Donation.donators;
  console.log(alldonators);
});

task("getdonatorvalue", "get the value account donates")
.addParam("account", "The account address which donates to")
.setAction(async (taskArgs)=> {
  const Donation = await ethers.getContractFactory("Donation");
  const value = await Donation.getDonatorValue(taskArgs.account);
  console.log(value);
});

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
      chainId: 13137
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};