const MyCoin = artifacts.require("myCoin");

module.exports = async function(deployer) {
    await deployer.deploy(MyCoin)
};