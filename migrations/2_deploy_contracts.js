// migrating the appropriate contracts
//const Ownable = artifacts.require("CustomERC721Token");
const Verifier = artifacts.require("./verifier.sol");
const SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
//const token = artifacts.require("ERC721Metadata");
//const Tradeable = artifacts.require("./TradeableERC721Token.sol")

module.exports = async function(deployer) {
  //await deployer.deploy(token, "Real Estate", "RER");
  await deployer.deploy(Verifier);
  await deployer.deploy(SolnSquareVerifier, Verifier.address,"Real Estate", "RERAY");
  //await deployer.deploy(Tradeable, "Real Estate", "RER");
};
