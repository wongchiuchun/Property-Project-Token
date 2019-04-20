// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var Verifier = artifacts.require("Verifier");
var SolnSquare = artifacts.require("SolnSquareVerifier");

contract('Test Mine', accounts => {

    const owner = accounts[0];


    describe('should require verification before minting', function () {
        before (async function () { 
            verify = await Verifier.deployed({from: owner});
            this.contract = await SolnSquare.deployed(verify.address,"Real Estate", "RER", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", {from: owner});
        })
    
        it('should verify before minting', async function () { 
            let proof = {
                "proof":
                {
                    "A":["0x18917ce5503c103407af47249068c9905a204df32015f975065f5c772d131562", "0x28d13bfc3808d3932903406b8803c6056415f25cc3c7237bcdf455b0bf1c4206"],
                    "A_p":["0x18a99dfa0288309f5aa9c5cd9d2ecd4a1ba14541bfdeb02aea142ad4a1a963ce", "0x24ade94614622e12994a11be687ee03e74d1636623633495b1e47dfeef79a4e2"],
                    "B":
                        [["0x1a39190ae2a224ceee6709a21ce1414ab43f1556b6544b89dcc26143ba978b2c", "0x0a7d94efc1e79d73dbb242a33c586deff7b5b45828f1ac6ab776b75bd21eace0"], ["0x16c45cc86f6cad1a0fb7bf1b29ed56c6101acd840c95be71b749bf70c1d13557", "0x22f269a3792bfa65d7c512bf407d84586820dd8594fb08fd46ac0c99794ccf03"]],
                    
                    "B_p":["0x2926f95a4444050f3578679d6a886acb77c77707780cbc4acded98334c6ed0f4", "0x0b703fd2b00f4384a7c50e9d377d51fdc6329add8f7f6aa02c429577b422c894"],
                    "C":["0x20e27b95f0ef20edf796e6f8b34adb80a2c0233b03fa98619563fd57d4fe01b9", "0x2ae3430a5c11a9bed4baaca2fe2fb7778cdad7236b2052010b65ff771b4af881"],
                    "C_p":["0x018c16ceaec70e401aff3a86292dd760f35b65bda0d3c83d3a81c77e97a8c448", "0x268af8ce24089a7a8543e4d995d014fedc8b04efe46f5a4e32b40ea1789c4d54"],
                    "H":["0x2c7bbdb94e2a6f9f7a01681bfe9d5ffc2a21dcd3d808740ff1299028e110604c", "0x1d6048e4bcebc0274fe873b2844a541e58eca966bb42b1163658bf63da40b29e"],
                    "K":["0x0d18fdb4a5b9b908bdc170588edbb01137e4a31c699fe7fb87f531b410fa7de3", "0x15805b601c4a4935dfa0b4623741935aa83b580f3755a943947f92a8b4a38a5c"]
                },
                "input":[0000000000000000000000000000000000000000000000000000000000000009,0000000000000000000000000000000000000000000000000000000000000001]
            };
            let a = proof.proof.A;
            let ap = proof.proof.A_p;
            let b = proof.proof.B; 
            let bp = proof.proof.B_p;
            let c = proof.proof.C;
            let cp = proof.proof.C_p;
            let h = proof.proof.H;
            let k = proof.proof.K;
            let input = proof.input;
            let to = accounts[1];
            let tokenID = 1;
            let result = await this.contract.minttoken(a,ap,b,bp,c,cp,h,k,input,to,tokenID,{from: owner});//.then((res,err)=>{return result = res.logs[0].event});
            let success = result.logs[1].event;
            assert.equal(success,"Transfer"); 

            
        })

        it('can not use the same proof twice', async function () { 
            let errormsg = ""
            let proof = {
                "proof":
                {
                    "A":["0x18917ce5503c103407af47249068c9905a204df32015f975065f5c772d131562", "0x28d13bfc3808d3932903406b8803c6056415f25cc3c7237bcdf455b0bf1c4206"],
                    "A_p":["0x18a99dfa0288309f5aa9c5cd9d2ecd4a1ba14541bfdeb02aea142ad4a1a963ce", "0x24ade94614622e12994a11be687ee03e74d1636623633495b1e47dfeef79a4e2"],
                    "B":
                        [["0x1a39190ae2a224ceee6709a21ce1414ab43f1556b6544b89dcc26143ba978b2c", "0x0a7d94efc1e79d73dbb242a33c586deff7b5b45828f1ac6ab776b75bd21eace0"], ["0x16c45cc86f6cad1a0fb7bf1b29ed56c6101acd840c95be71b749bf70c1d13557", "0x22f269a3792bfa65d7c512bf407d84586820dd8594fb08fd46ac0c99794ccf03"]],
                    
                    "B_p":["0x2926f95a4444050f3578679d6a886acb77c77707780cbc4acded98334c6ed0f4", "0x0b703fd2b00f4384a7c50e9d377d51fdc6329add8f7f6aa02c429577b422c894"],
                    "C":["0x20e27b95f0ef20edf796e6f8b34adb80a2c0233b03fa98619563fd57d4fe01b9", "0x2ae3430a5c11a9bed4baaca2fe2fb7778cdad7236b2052010b65ff771b4af881"],
                    "C_p":["0x018c16ceaec70e401aff3a86292dd760f35b65bda0d3c83d3a81c77e97a8c448", "0x268af8ce24089a7a8543e4d995d014fedc8b04efe46f5a4e32b40ea1789c4d54"],
                    "H":["0x2c7bbdb94e2a6f9f7a01681bfe9d5ffc2a21dcd3d808740ff1299028e110604c", "0x1d6048e4bcebc0274fe873b2844a541e58eca966bb42b1163658bf63da40b29e"],
                    "K":["0x0d18fdb4a5b9b908bdc170588edbb01137e4a31c699fe7fb87f531b410fa7de3", "0x15805b601c4a4935dfa0b4623741935aa83b580f3755a943947f92a8b4a38a5c"]
                },
                "input":[0000000000000000000000000000000000000000000000000000000000000009,0000000000000000000000000000000000000000000000000000000000000001]
            };
            let a = proof.proof.A;
            let ap = proof.proof.A_p;
            let b = proof.proof.B; 
            let bp = proof.proof.B_p;
            let c = proof.proof.C;
            let cp = proof.proof.C_p;
            let h = proof.proof.H;
            let k = proof.proof.K;
            let input = proof.input;
            let to = accounts[1];
            let tokenID1 = 2;
            try {
                await this.contract.minttoken(a,ap,b,bp,c,cp,h,k,input,to,tokenID1,{from: owner});
              }
              catch(err) {
                errormsg = err
              }
            assert.equal(errormsg, "Error: Returned error: VM Exception while processing transaction: revert proof has been used -- Reason given: proof has been used.")
        })

        
        it('total supply = 1', async function () { 
            let result = await this.contract.totalSupply();
            assert.equal(result,1);
        })
        



    });

})