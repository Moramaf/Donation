const { tasks } = require("hardhat");

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("solidity-coverage");
require("./tasks/changeOwner");
require("./tasks/getdonators");
require("./tasks/getdonatorsvalue");
require("./tasks/withdraw");


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
  plugins: ["solidity-coverage"],
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
    artifacts: "./artifacts",
    tasks: "./tasks"
  },
  mocha: {
    timeout: 40000
  }
};