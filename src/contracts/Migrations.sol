pragma solidity ^0.5.0;

contract Migrations {
    address public owner;
    uint public last_completed_migrations;

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted(){
        if (msg.sender == owner) _; // if true continue
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migrations = completed;
    }

    function upgrade(uint new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migrations);
    }

}