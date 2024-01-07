const {expect} = require("chai");

describe("VirToken", () => {
  let tokenSupply = '100';
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async () => {
    [owner,addr1,addr2] = await ethers.getSigners();
    const VirToken = await ethers.getContractFactory("VirToken");
    token = await VirToken.deploy(tokenSupply);

  });

  describe("Deployment",() => {
      it("Should assign total supply of token to the owner/deployer", async() => {
       // console.log("owner: ",owner);
        const ownerbalance = await token.balanceOf(owner.address);
        expect(await token.totalSupply()).to.equal(ownerbalance);
      });
  });


  describe("Transactions",() => {
    it("should transfer tokens between accounts", async () =>{
      await token.transfer(addr1.address,50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);
    });

    it("transactions should if account don't have sufficient balance", async() => {
      await expect(token.connect(addr1).transfer(addr2.address,51)).to.be.reverted;
    });
  });
});