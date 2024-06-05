// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract class{

  struct Student{
    uint256 id;
    string name;
    string faculty;
  }

  mapping (uint=> Student) public id2detail;
     event eventCreated(uint256 id, string  name, string  faculty);
     event eventUpdated (uint id, string  name, string faculty);
     event eventDeleted (uint id);

    address public admin;
    modifier onlyAdmin (){
        require(msg.sender == admin," Only admin can modify this");
        _;
    }
    constructor(){
        admin= msg.sender;
    }

    function create(uint _id, string memory _name, string memory _faculty) public onlyAdmin{
        id2detail[_id]= Student(_id, _name, _faculty);
        emit eventCreated(_id, _name, _faculty);
    }
    function updateStudent(uint _id, string memory _name , string memory _faculty ) public onlyAdmin{
        Student storage  std=  id2detail[_id];
        std.name =  _name;
        std.faculty = _faculty;
    }
    function deleteStudent(uint _id ) public onlyAdmin{
        delete id2detail[_id];
    }
}
