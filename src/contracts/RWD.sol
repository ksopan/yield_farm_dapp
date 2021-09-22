pragma solidity ^0.5.0;

contract RWD {
    string public name = 'Rewrd Token';
    string public symbol = 'RWD';
    uint256 public totalSupply = 1000000000000000000000000; // 1 Million token
    uint8 public decimals = 18;

// Transfer event from to spender indexed allwos us to filter through address
    event Transfer(
        address indexed _from, 
        address indexed _to,
        uint _value
    );
// Approve event , transfer won't happen without approval by Owner
    event Approval(
        address indexed _owner, 
        address indexed _spender,
        uint _value
    );

// tracking balance
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

// constructor sets the total token supply value
    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }
// transfer function makes transactions and maintain balance
    function transfer(address _to, uint _value) public returns (bool success) {
    // require that the value is greate or equal for transfer       
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit  Transfer(msg.sender, _to, _value);
        return true;
    }

// the person who is currently connecting to the contract, towards the spender is going to be equal to the value and this needs to be approved. Message sender is the person that we want to be approving.

    function approve(address _spender, uint _value) public returns (bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
// here the owner is msg.sender
    }

// here _from means the addresses mentioned in the Ganache accounts 
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
// require that balue which is to be transffered should be less than the balance of sender or transfer from the address and same goes for allowance as well 
            require(_value <= balanceOf[_from]);
            require(_value <= allowance[_from][msg.sender]);

            balanceOf[_to] += _value;
            balanceOf[_from] -= _value;

// allowance/money comes from message sender and address is from equal to the allowance to message sender
            allowance[msg.sender][_from] -= _value;
            emit Transfer(_from, _to, _value);
            return true;

    }

}
