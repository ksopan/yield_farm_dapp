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
    
    describe('Yield Farming', async () => {
        it('rewards tokens for staking', async () => {
        
        let result
        // check investor/customer Balance . cutsomer is from line #9
        result = await tether.balanceOf(customer)
        assert.equal(result.toString(),tokens('100'),'Customer tether balance before staking')

        // Check Staking for customers of 100 tokens
        await tether.approve(decentralBank.address,tokens('100'),{from: customer})
        await decentralBank.depositTokens(tokens('100'), {from: customer})

        // Check Update balance of customer
        result = await tether.balanceOf(customer)
        assert.equal(result.toString(),tokens('0'),'Customer tether balance after staking 100 tokens')
        
        // Check Update balance of Owner
        result = await tether.balanceOf(decentralBank.address)
        assert.equal(result.toString(),tokens('100'),'Decentral tether balance after staking from customer ')
        
        // Is Staking Update
        result = await decentralBank.isStaking(customer)
        assert.equal(result.toString(),'true','cutomer status after staking')

        // Issue tokens by owner as incentives
        await decentralBank.issueTokens({from: owner})

        // Ensure only the owner can Issue Tokens PS: Customers not allow to issue tokens
        await decentralBank.issueTokens({from: customer}).should.be.rejected;

        // Unstake Token Test
        await decentralBank.unstakeTokens({from: customer})

        // Check unstaking Balances

        // Check Update balance of customer
        result = await tether.balanceOf(customer)
        assert.equal(result.toString(),tokens('100'),'Customer tether balance after unstaking')
        
        // Check Update balance of Owner
        result = await tether.balanceOf(decentralBank.address)
        assert.equal(result.toString(),tokens('0'),'Decentral tether balance after staking from customer ')
        
        // Is Staking Update
        result = await decentralBank.isStaking(customer)
        assert.equal(result.toString(),'false','cutomer status is not staking after unstaking')

        })

    })

})
