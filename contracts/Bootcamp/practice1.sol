// SPDX-License-Identifier: MIT
pragma solidity^0.8.8;

contract practice1{
    uint256 public std_id;
    string public std_name;

    mapping(uint256=> string) public id2name;

     function addstudent(uint256 _std_id, string memory _std_name) public{
            std_id= _std_id;
            std_name= _std_name;
            id2name[_std_id]= _std_name;
        }
    
}

