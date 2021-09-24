import React, {Component} from 'react'
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import Main from './Main.js'

 class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadweb3()
        await this.loadBlockchainData()
    }

    async loadweb3() {
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('No etherum browser detected check out MetaMask!')
        } 
    }

    async loadBlockchainData(){
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]}) // Get account from Metamask Account 2
        console.log({account: account })
        const networkId = await web3.eth.net.getId() // Ganache network ID
        
        // Load Tether Contract
        const tetherData = Tether.networks[networkId]
        if(tetherData){
            const tether = new web3.eth.Contract(Tether.abi,tetherData.address)
            this.setState({tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString() })
            console.log({balnce: tetherBalance })
        } else {
            window.alert('Error ! tether contract not deployed- no detected network')
        }

        // Load Reward Contract
        const rwdData = RWD.networks[networkId]
        if(rwdData){
            const rwd = new web3.eth.Contract(RWD.abi,rwdData.address)
            this.setState({rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString() })
            console.log({balnce: rwdBalance })
        } else {
            window.alert('Error ! Rewards contract not deployed- no detected network')
        }
    
        // Load Decentral Bank Contract
        const decentralBankData = DecentralBank.networks[networkId]
        if(rwdData){
            const decentralBank = new web3.eth.Contract(DecentralBank.abi,decentralBankData.address)
            this.setState({decentralBank})
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString() })
            console.log({balnce: stakingBalance })
        } else {
            window.alert('Error ! Deentral Bank contract not deployed- no detected network')
        }
    
        this.setState({loading: false})

    }

    // Make two functions for stakes and other one for unstakes -
    // Leverage our decentralBank contract - deposit tokens and unstaking
    // depositTokens transferFrom
    // STAKING Function .. Access decentralBank.depositTokens ans send transactionHash ..

    constructor(props){
        super(props)
        this.state = {
             account: '0x0',
             tether: {},
             rwd: {},
             decentralBank: {},
             tetherBalance: '0',
             rwdBalance: '0',
             statkingBalance: '0',
             loading: true
        }
    }

     render (){
         // Load above contarcts functions before loading Main; because Main.js contains all the operations like withdrawing and depositing tethers/rewards. If above contract did not load Main.js functions will break down
         let content
         {this.state.loading ? content =
         <p id='loader' className='text-center' style={{margin:'30px'}}>
             LOADING PLEASE..</p> : content = <Main 
             tetherBalance={this.state.tetherBalance}
             rwdBalance={this.state.rwdBalance}
             stakingBalance={this.state.statkingBalance}
             />}
         return (
             <div>
                 <Navbar account={this.state.account}/>
             <div className='container-fluis mt-5'>
                 <div className='row'>  
                <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth:'600px',minWidth:'100vm'}}>
                    <div>
                        {content}
                    </div>
                    </main>
                </div>
             </div>        
             </div>
             
         )
     }
 }

 export default App;