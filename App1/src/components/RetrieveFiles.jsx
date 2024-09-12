import React, { useState } from 'react';

const RetrieveFiles = ({ contractInstance, account }) => {
  
  const [filename, setFilename] = useState(""); // State to store the filename input
  const [recordId, setRecordId] = useState(""); // State for record ID input
  const [fileInfo, setFileInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  // Function to retrieve file by record ID
  const handleRetrieve = async () => {
    if (!recordId) {
      setMessage('Please enter a record ID.');
      return;
    }

    if (!contractInstance) {
      setMessage('Contract instance not initialized.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const record = await contractInstance.getRecord(recordId);
      const [uploader, hospital, fileHash] = record;
      const fileUrl = `https://fuchsia-realistic-rattlesnake-554.mypinata.cloud/ipfs/${fileHash}`;

      setFileInfo({ uploader, hospital, fileUrl });
      setMessage('File retrieved successfully!');
    } catch (error) {
      console.error('Error retrieving file:', error);
      setMessage('Error retrieving file. See console for details.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Function to retrieve file by filename
  const handleRetrieveByFilename = async () => {
    if (!filename) {
      setMessage('Please enter a filename.');
      return;
    }

    if (!contractInstance) {
      setMessage('Contract instance not initialized.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const record = await contractInstance.getRecordByFilename(filename);
      const [uploader, hospital, fileHash] = record;
      const fileUrl = `https://fuchsia-realistic-rattlesnake-554.mypinata.cloud/ipfs/${fileHash}`;

      setFileInfo({ uploader, hospital, fileUrl });
      setMessage('File retrieved successfully!');
    } catch (error) {
      console.error('Error retrieving file by filename:', error);
      setMessage('Error retrieving file by filename. See console for details.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <form className='rounded-lg px-4 py-4'>
        <div className="h-screen bg-gray-200 text-white p-4 rounded-lg">
          <h2 className="text-3xl mb-2 text-black font-bold text-left tracking-wide">Retrieve Health Records</h2>
          <hr className="border-t-2 border-gray-300 mb-4" />

          <div className="text-black mb-4">
            <form className=''>
              <button
                onClick={() => {
                  setSearchType('id');
                  setActiveSection('id');
                }}
                className={`border border-black rounded-lg w-1/2 ${activeSection === 'id' ? 'bg-purple-600' : 'hover:bg-gray-400'}`}>
                Search By ID
              </button>

              <button
                onClick={() => {
                  setSearchType('name');
                  setActiveSection('name');
                }}
                className={`border border-black rounded-lg w-1/2 ${activeSection === 'name' ? 'bg-purple-600' : 'hover:bg-gray-400'}`}>
                Search By Name
              </button>
              <hr className="border-t-2 border-gray-300 mt-4 mb-4" />

              {searchType === 'id' && (
                <>
                  <input 
                    type="text" 
                    value={recordId}
                    onChange={(e) => setRecordId(e.target.value)}
                    placeholder='Enter Record ID'
                    className='border border-black rounded-md h-10'
                  />

                  <button
                    className='border border-black rounded-md ml-4 h-10 w-28 bg-blue-500 hover:bg-blue-700'
                    type="button"
                    onClick={handleRetrieve}            
                  >
                    Retrieve
                  </button>

                  {message && 
                    <div className="text-blue-600 font-semibold">{message}</div>}
                  <hr className="border-t-2 border-gray-300 mt-4 mb-4" />
                </>
              )}

              {searchType === 'name' && (
                <>
                  <input 
                    type="text" 
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    placeholder='Enter Filename'
                    className='border border-black rounded-md h-10'
                  />

                  <button
                    className='border border-black rounded-md ml-4 h-10 w-28 bg-blue-500 hover:bg-blue-700'
                    type="button"
                    onClick={handleRetrieveByFilename}            
                  >
                    Retrieve
                  </button>

                  {message && 
                    <div className="text-blue-600 font-semibold">{message}</div>}
                  <hr className="border-t-2 border-gray-300 mt-4 mb-4" />
                </>
              )}
            </form>
          </div>

          {fileInfo && (
            <div className="w-full px-4">
              <table className="table-auto w-full text-left border-separate border-spacing-0 border border-black">
                <thead className="text-black bg-blue-400">
                  <tr>
                    <th className="border border-black px-4 py-2">Uploader's Address</th>
                    <th className="border border-black px-4 py-2">Hospital</th>
                    <th className="border border-black px-4 py-2">File URL</th>
                  </tr>
                </thead>
                <tbody className='text-black'>
                  <tr>
                    <td className="border border-black px-4 py-2">{fileInfo.uploader}</td>
                    <td className="border border-black px-4 py-2">{fileInfo.hospital}</td>
                    <td className="border border-black px-4 py-2">
                      <a 
                        href={fileInfo.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:underline"
                      >
                        {fileInfo.fileUrl}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RetrieveFiles;
