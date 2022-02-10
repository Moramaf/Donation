const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Donation", function () {
    let donation;

    beforeEach(async ()=>{
        [owner, addr1, addr2,addr3, ...addrs] = await ethers.getSigners();
        const Donation = await ethers.getContractFactory("Donation");
        donation = await Donation.deploy();
        await donation.deployed();
        const tx = {
          to: donation.address,
          value: ethers.utils.parseEther('3')
        }
        const sendTx = await addr2.sendTransaction(tx);
        await sendTx.wait();
        
    });
  it("Checking an owner is a contract creator", async function () {
    expect(await donation.owner()).to.equal(owner.address);
  });
  
  it("Checking owner is changed", async function () {
    await donation.changeOwner(addr1.address);
    expect(await donation.owner()).to.equal(addr1.address);
  });

  it("Checking contract receive coins", async function () {
    const rawBalance = await ethers.provider.getBalance(donation.address);
    expect(await ethers.utils.formatEther(rawBalance)).to.equal('3.0');
  });

  it("Checking withdraw", async function () {
    await donation.withdraw(addr3.address);
    const rawBalance = await ethers.provider.getBalance(donation.address);
    expect(await ethers.utils.formatEther(rawBalance)).to.equal('0.0');
  });

  it("Checking get donators", async function () {
    expect(await donation.getDonators()).to.equal(donation.donators());
  });

  it("Checking get donators amount", async function () {
    expect(await donation.getDonatorValue(addr2.address)).to.equal(ethers.utils.parseEther('3.0'));
  });
});