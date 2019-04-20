pragma solidity ^0.5.2;

import "./ERC721Mintable.sol";

contract SolnSquareVerifier is CustomERC721Token {

Verifier verifier;

constructor (address data, string memory name, string memory symbol) public CustomERC721Token(name, symbol) {
        verifier = Verifier(data);
    }

struct Solution {
    uint256 hashproof;
    address provider;
}

Solution [] public solutions;

mapping(uint256 => bool) private unisolution;

event solutionadded (uint256 hashproof, address provider); 

function addsolution (uint256 _hashproof, address _provider) public {
    solutions.push(Solution({hashproof: _hashproof, provider: _provider}));
    emit solutionadded (_hashproof, _provider);
}

function minttoken (
            uint[2] memory a,
            uint[2] memory a_p,
            uint[2][2] memory b,
            uint[2] memory b_p,
            uint[2] memory c,
            uint[2] memory c_p,
            uint[2] memory h,
            uint[2] memory k,
            uint[2] memory input,
            address to,
            uint256 tokenId
            ) public returns (bool){
    uint256 hashproof = uint256(keccak256(abi.encode(a, a_p, b, b_p, c, c_p, h, k, input)));
    require (unisolution[hashproof]==false, 'proof has been used'); 
    bool result = verifier.verifyTx(a,a_p,b,b_p,c,c_p,h,k,input);
    require (result == true);
    unisolution[hashproof] = true;
    addsolution(hashproof, to);
    mint(to, tokenId);
    }

}

contract Verifier {

        function verifyTx(
            uint[2] calldata a,
            uint[2] calldata a_p,
            uint[2][2] calldata b,
            uint[2] calldata b_p,
            uint[2] calldata c,
            uint[2] calldata c_p,
            uint[2] calldata h,
            uint[2] calldata k,
            uint[2] calldata input
        ) external returns (bool r);
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly


  
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class



// TODO define a solutions struct that can hold an index & an address


// TODO define an array of the above struct


// TODO define a mapping to store unique solutions submitted



// TODO Create an event to emit when a solution is added



// TODO Create a function to add the solutions to the array and emit the event



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

























