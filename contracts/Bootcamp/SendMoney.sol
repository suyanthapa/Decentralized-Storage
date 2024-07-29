// SPDX-License-Identifier: MIT
pragma solidity^0.8.8;

contract ChangeName{
    // string myName= " Suyan Thapa";

    // function setName(string memory _name) public{
    //     myName=_name;
    // }

    // function getName() public view returns( string memory){
    //     return myName;
    // }

    // Event to log the transaction details
    event MoneySent(address indexed from, address indexed to, uint256 amount, uint256 timestamp);

    // Function to send money to a desired address
    function sendMoney(address payable _to) external payable {
        require(msg.value > 0, "Send some ETH"); // Require at least some ETH to be sent
        _to.transfer(msg.value); // Transfer the received ETH to the specified address
        emit MoneySent(msg.sender, _to, msg.value, block.timestamp); // Emit an event for the transaction
    }


//for uploading files into blockchian
    struct Record {
        address uploader;
        string hospital;
        string fileHash;
    }

    mapping(uint256 => Record) public records;
    uint256 public recordCount;

    event RecordUploaded(
        uint256 indexed recordId,
        address indexed uploader,
        string hospital,
        string fileHash
    );

    function uploadRecord(string memory _hospital, string memory _fileHash) public {
        require(bytes(_hospital).length > 0, "Hospital name is required");
        require(bytes(_fileHash).length > 0, "File hash is required");

        recordCount++;
        records[recordCount] = Record(msg.sender, _hospital, _fileHash);

        emit RecordUploaded(recordCount, msg.sender, _hospital, _fileHash);
    }

    function getRecord(uint256 _recordId) public view returns (address, string memory, string memory) {
        Record memory record = records[_recordId];
        return (record.uploader, record.hospital, record.fileHash);
    }

 }

