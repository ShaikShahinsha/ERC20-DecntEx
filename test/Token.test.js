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
        console.log("owner: ",owner);
        const ownerbalance = await token.balanceOf(owner.address);
        expect(await token.totalSupply()).to.equal(ownerbalance);
      });
  });
});