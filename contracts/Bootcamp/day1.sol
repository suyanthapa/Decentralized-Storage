// SPDX-License-Identifier: MIT
pragma solidity^0.8.8;

contract day1{
    bool hasFavouriteNumber= false;
     string FavouriteNumberinText= "Five";
    int256 FavouriteInt= 88;
    address myAddress = 0x48c90C881bAbFC694e68e1Eb9BB804670cA5bE9F;
    bytes32 FavouriteBytes= "Cat";

    //  uint256 public  FavNum ; //This gets intialzed to Zero !

    // uint public numm=180;
    //  function store () public{
    //    uint num=10;
     
    // }
    // uint val=4;
    // function add() public pure returns (uint){
    //     return  5+1;
    // }


    

    //  function Ad() public pure returns (uint){
    // uint a=10;
    //  uint b=20;
    //  return a+b;

    //  }
    uint public number;
     function PrintNumber(uint _nm) public{
        number = _nm;
     }

       string public n1; //This gets intialzed to Zero !
     function PrintString(string memory n2) public{
         n1= n2;
     }
}
