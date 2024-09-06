// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract ChangeName {

    // Event to log record uploads
    event RecordUploaded(
        uint256 indexed recordId,
        address indexed uploader,
        string hospital,
        string fileName,       // File name without extension
        string fileType,       // File extension (type)
        string date,
        string fileHash
    );

    struct Record {
        address uploader;
        string hospital;
        string fileName;      // File name without extension
        string fileType;      // File extension (type)
        string date;
        string fileHash;
    }

    mapping(uint256 => Record) public records;
    uint256 public recordCount;

    // Function to upload a record
    function uploadRecord(
        string memory _hospital,
        string memory _fileName,    // New field for file name without extension
        string memory _fileType,    // New field for file extension (type)
        string memory _date,
        string memory _fileHash
    ) 
        public 
    {
        require(bytes(_hospital).length > 0, "Hospital name is required");
        require(bytes(_fileName).length > 0, "File name is required"); // Require file name
        require(bytes(_fileType).length > 0, "File type is required"); // Require file type
        require(bytes(_date).length > 0, "Date is required");
        require(bytes(_fileHash).length > 0, "File hash is required");

        recordCount++;
        records[recordCount] = Record(msg.sender, _hospital, _fileName, _fileType, _date, _fileHash);

        emit RecordUploaded(recordCount, msg.sender, _hospital, _fileName, _fileType, _date, _fileHash);
    }

    // Function to get a record by its ID
    function getRecord(uint256 _recordId) public view returns (address, string memory, string memory) {
        Record memory record = records[_recordId];
        return (record.uploader, record.hospital, record.fileHash);
    }

 

    // Function to retrieve recent files
    function getRecentRecords(uint256 _count) public view returns (Record[] memory) {
        require(_count > 0, "Count should be greater than 0");
        uint256 startIndex = recordCount > _count ? recordCount - _count : 0;
        uint256 resultCount = recordCount - startIndex;

        Record[] memory recentRecords = new Record[](resultCount);
        uint256 j = 0;

        for (uint256 i = startIndex + 1; i <= recordCount; i++) {
            recentRecords[j] = records[i];
            j++;
        }

        return recentRecords;
    }
}
