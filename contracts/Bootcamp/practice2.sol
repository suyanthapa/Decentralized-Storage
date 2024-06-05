// SPDX-License-Identifier: MIT
pragma solidity^0.8.8;
contract Assignment1{

    struct Student {
        uint id;
        string name;
        string faculty;
    }

    mapping(uint => Student) public students;

    function create(uint _id, string memory _name, string memory _faculty) public {
        students[_id] = Student(_id, _name, _faculty);
    }

    // Update student's details
    function updateS(uint _id, string memory _name, string memory _faculty) public {
        Student storage student = students[_id];
        student.name = _name;
        student.faculty = _faculty;
    }

    // Delete student's details
    function deleteStudent(uint _id) public {
        delete students[_id];
    }
}