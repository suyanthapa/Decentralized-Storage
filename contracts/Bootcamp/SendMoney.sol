// SPDX-License-Identifier: MIT
pragma solidity^0.8.8;

contract ChangeName{
    string myName= " Suyan Thapa";

    function setName(string memory _name) public{
        myName=_name;
    }

    function getName() public view returns( string memory){
        return myName;
    }

    // Event to log the transaction details
    event MoneySent(address indexed from, address indexed to, uint256 amount, uint256 timestamp);

    // Function to send money to a desired address
    function sendMoney(address payable _to) external payable {
        require(msg.value > 0, "Send some ETH"); // Require at least some ETH to be sent
        _to.transfer(msg.value); // Transfer the received ETH to the specified address
        emit MoneySent(msg.sender, _to, msg.value, block.timestamp); // Emit an event for the transaction
    }

}

