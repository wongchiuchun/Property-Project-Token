var CustomERC721Token = artifacts.require("CustomERC721Token");

contract('TestContract', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('match erc721 spec', function () {
        before (async function () { 
            this.contract = await CustomERC721Token.new("Real Estate", "RER", {from: account_one});
            // TODO: mint multiple tokens
            await this.contract.mint(accounts[1],1,{from: account_one});
            await this.contract.mint(accounts[1],2,{from: account_one});
            await this.contract.mint(accounts[2],3,{from: account_one});
            await this.contract.mint(accounts[2],4,{from: account_one});
        })

       

        it('should return total supply', async function () { 
            let supply = 0;
            supply = await this.contract.totalSupply();
            assert.equal(supply,4);
        })

        it('should get token balance', async function () { 
            let tbalance = 0;
            tbalance = await this.contract.balanceOf(account_two);
            assert.equal(tbalance, 2);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = "";
            uri = await this.contract.tokenURI(1);
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1")
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_three, 2,{from: account_two});
            newowner = await this.contract.ownerOf(2);
            assert.equal(newowner, account_three);
        })
    });

    describe('have ownership properties', function () {
        before(async function () { 
            this.contract = await CustomERC721Token.new("Real Estate", "RER",{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
        let errormsg = ""
        try {
            await this.contract.mint(accounts[1],1,{from: account_two});
          }
          catch(err) {
            errormsg = err
          }
        assert.equal(errormsg, "Error: Returned error: VM Exception while processing transaction: revert");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner();
            assert.equal(owner, account_one);     
        })

    });
})