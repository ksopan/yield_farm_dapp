const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank"); 

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank',([owner, customer]) => {
    let tether, rwd , decentralBank

    function tokens(number){
        return web3.utils.toWei(number,'ether')
    }
// set up before hooks
    before(async ()=> {
        // Load Contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        
        decentralBank = await DecentralBank.new(rwd.address, tether.address)
 
        // Transfer all tokens to DecentralBank (1 million)
        await rwd.transfer(decentralBank.address,tokens('1000000'))

        // Transfer rewards 100 tokens to the investors
        await tether.transfer(customer,tokens('100'),{from: owner})
        
    })
    
    // assertion test to check if contract deployed correctly and uploded to right name
    
    describe('Mock Tether Deployment', async () => {
    // it allows to bring us description   
        it('matches names successfully', async ()=> {
            const name = await tether.name()
            assert.equal(name, 'Tether') // this name should match with Tether.sol Line# 4
        })
    })

    describe('RWD Deployment', async () => {
        it('matches symbol successfully', async ()=> {
            const name = await rwd.symbol()
            assert.equal(name, 'RWD') 
            })
        })

    describe('Decentral Bank Deployment', async () => {
        it('Check Transfer successfully', async ()=> {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank') 
            })

        it('contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance,tokens('1000000'))
            })

        })
    

})
