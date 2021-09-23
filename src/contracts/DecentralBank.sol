pragma solidity ^0.5.0;
import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;


// build constructor here to set up interaction with RWD and Tether token
constructor(RWD _rwd,Tether _tether) public{
    rwd = _rwd;
    tether = _tether;
    owner = msg.sender; 
    // msg.ender is always a person who is calling the contract whether it can be owner or customer
}

// Staking function. We are Transferring tether token to Central bank contract.
function depositTokens(uint _amount) public {
// Require staking amount should be greater than zero
require(_amount >0,'amount can not be 0');

// Transfer tether tokens to this contract address for staking
// We are using TransferFrom function because it is coming from third party ... Bank, account Owner, Third Party. Ex. Bank, Myself, Store Cashier
tether.transferFrom(msg.sender, address(this), _amount);

// update Staking balance
 stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
// stakingBalance[msg.sender] += _amount ;
if(!hasStaked[msg.sender]){
    stakers.push(msg.sender);
    }

// Update Staking Balance
isStaking[msg.sender] = true;
hasStaked[msg.sender] = true;

// msg.ender is always a person who is calling the contract whether it can be owner or customer
}

// Unstaking tokens
function unstakeTokens() public {
//  We're setting it up so that the amount of the balance right now is going to be the amount coming from the person who is calling upon the contract, so it's a staking balance 

    uint balance = stakingBalance[msg.sender]; 
    require(balance > 0, 'Staking balance cannot be less than 0');

// transfer tokens to the specified contract address from the Decentralised Bank
    tether.transfer(msg.sender, balance);

// Reset Staking Balance
    stakingBalance[msg.sender] = 0;

// Update Sating Status
    isStaking[msg.sender] = false;
}

// Issue rewards
function issueTokens() public {
// require the owner to issue tokens only
    require(msg.sender == owner, 'caller must be the owner');
    for (uint i=0; i< stakers.length; i++){
        address recipient = stakers[i];
        uint balance = stakingBalance[recipient]* 1/9; /// Divide by 9 to create % incentive
        if(balance > 0){
            rwd.transfer(recipient, balance);
            }
        }
    }

}

