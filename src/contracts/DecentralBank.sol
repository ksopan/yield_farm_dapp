pragma solidity ^0.5.0;
import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

// build constructor here to set up interaction with RWD and Tether token
constructor(RWD _rwd,Tether _tether) public{
    rwd = _rwd;
    tether = _tether;
}

}

