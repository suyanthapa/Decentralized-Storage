// SPDX-License-Identifier: MIT
pragma solidity^0.8.8;


contract constructor1{
  /*  string public myname="suyan";
    event Change(string myname);

    function changeName( string memory _cn) public {
        myname=_cn;
    }*/

    address payable public owner;
    constructor(){
        owner= payable(msg.sender);

    }
    function transferEth() payable public{
        owner.transfer(msg.value);
    }

}