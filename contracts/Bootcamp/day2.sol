// SPDX-License-Identifier: MIT
pragma solidity^0.8.8;

contract array{
 /*   uint[] public arr;


    // to push new element in the array
    function push(uint _num) public {
        arr.push(_num);
    }
    // to view every array elements
    function getValue() public view returns(uint[] memory){
        return arr;
    }
    // to delete the last element from the array
    function pop() public{
        arr.pop();
    }
    // to find the length of the array
    function getlen() public view returns(uint){
         return arr.length;
    }*/

/*     string[]  StringArr;

    function push(string memory name) public{
        StringArr.push(name);
    }

    function pop() public{
        StringArr.pop();
    }

    function getValue() public view returns(string[] memory){
        return StringArr;
 }

    function getlen() public view returns(uint){
        return StringArr.length;
    }*/


      struct book{
        uint256 book_id;
        string author_name;
        uint price;
    }
    /*
book BookVar;

     function BookSet(uint256 _id, string memory _name, uint256 _price) public{
     BookVar= book(_id, _name, _price);
}
    function getbookID() public view returns (uint){
        return BookVar.book_id;
    }

    function getAll() public view returns (book memory){
        return BookVar;
    }*/

     function BookSet(uint256 _id, string memory _name, uint256 _price) pure public{
        book memory boo;
        boo.book_id = _id;
        boo.author_name;
        boo.price= _price;
}


}

contract todo{

    struct todo{
        string text;
        bool completed;
    }

    todo[]  arr;
    function create(string memory _text) public  {
        todo memory td;
        td.text= _text;

        arr.push(td);
    }

    function getData(uint _id) public view returns(string memory text,bool completed){
        todo storage td= arr[_id];
        return (td.text, td.completed);
    }

    function updateTest(uint256 _id, string memory _text) public{
        todo storage td= arr[_id];
        td.text= _text;

    }

    function completed(uint _id)public {
         todo storage td= arr[_id];
         td.completed= true;
    }

    function showValue() public view returns(todo[] memory){
        return arr;

    }

    }

    contract enum1{

        enum directions{
            North,
            East,
            South,
            West
        }
        // directions dr;

        directions public myfav= directions.North;

        function changeDirection() public{
            myfav= directions.East;
        }
    }

    contract Mappings{

       struct Student{
        uint256 id;
        string name;
        string faculty;
       }
       mapping (uint256=> Student) public id2std;
       function addDetail(uint256 _id, string memory _name, string memory  _faculty) public {
        Student memory std;
        std.id= _id;
        std.name= _name;
        std.faculty= _faculty;

        id2std[_id]= std;

       }
    }

    
contract Assignment{
    uint256 public std_id;
    string public std_name;

    mapping(uint256=> string) public id2name;

     function addstudent(uint256 _std_id, string memory _std_name) public{
            std_id= _std_id;
            std_name= _std_name;
            id2name[_std_id]= _std_name;
        }
    
}