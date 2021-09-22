const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank"); 

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank',(accounts) => {
    // assertion test to check if contract deployed correctly and uploded to right name
    describe('Mock Tether Deployment', async () => {
    // it allows to bring us description   
        it('matches names successfully', async ()=> {
            let tether = await Tether.new()
            const name = await tether.name()
            assert.equal(name, 'Tether') // this name should match with Tether.sol Line# 4
        })
    })
})

contract('RWD',(accounts) => {
    // assertion test to check if contract deployed correctly and uploded to right name
    describe('RWD Deployment', async () => {
    // it allows to bring us description   
        it('matches symbol successfully', async ()=> {
            let rwd = await RWD.new()
            const name = await rwd.symbol()
            assert.equal(name, 'RWD') // this name should match with Tether.sol Line# 4
        })
    })
})