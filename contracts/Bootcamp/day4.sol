// SPDX-License-Identifier: MIT
pragma solidity^0.8.8;
contract evnt{

    event balance(address account,string message,uint256 value);

    function setdata(uint256 _value) public{
        emit balance (msg.sender, "has value", _value);
    }

}

contract day4{
    string public myName="suyan";
    uint num;

    function myName1(string memory _myName ) public{
        myName= _myName;
    }

    function setnum( uint _num) public {
        num=_num;

    }

    function getNum() public view returns(uint){
        return num;
    }

    function sendToContract() public payable{

    }

    function contractBal() public view returns(uint){
        return address(this).balance;
    }

    function sendToUser(address _user) public payable {
            payable (_user).transfer(msg.value);

    }

    function getBal(address _address) public view returns(uint){
        return (_address).balance;
    }
}