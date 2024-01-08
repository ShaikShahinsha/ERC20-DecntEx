const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("DeExchange", () => {
  let tokenSupply = '100';
  let token;
  let owner;
  let addr1;
  let addr2;

  let dex;
  let price = 100;
  beforeEach(async () => {
    [owner,addr1,addr2] = await ethers.getSigners();
    const VirToken = await ethers.getContractFactory("VirToken");
    token = await VirToken.deploy(tokenSupply);
    //console.log("toke address",token.runner.address);
    const DeExchange = await ethers.getContractFactory("DecExchange");
    dex = await DeExchange.deploy(token.runner.address, price);
   // console.log("dex deployed",dex);
  });

  describe("DEX TESTS",()=> {
    it("should fail if contract is not approved", async()=>{
        await expect(dex.sell()).to.be.reverted;
    });
  });

});