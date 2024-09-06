import React, { useState, useEffect } from 'react';

const RecentFiles = ({ contractInstance }) => {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchRecentFiles = async () => {
      try {
        setLoading(true);
        const recentFiles = await contractInstance.getRecentRecords(10);

        const formattedFiles = recentFiles.map((fileArray, index) => ({
          id: index + 1,
          hospital: fileArray[1], // Hospital Name
          fileName: fileArray[2], // File Name
          fileType: fileArray[3], // File Type (extension)
          date: fileArray[4],     // Uploaded Date
        }));

        setFiles(formattedFiles);
      } catch (error) {
        console.error("Error fetching recent files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentFiles();
  }, [contractInstance]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Hospital</th>
              <th className="px-4 py-2">File Name</th>
              <th className="px-4 py-2">File Type</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {files.length === 0 ? (
              <tr>
                <td className="border px-4 py-2" colSpan="5" align="center">
                  No recent files available.
                </td>
              </tr>
            ) : (
              files.map((file) => (
                <tr key={file.id}>
                  <td className="border px-4 py-2">{file.id}</td>
                  <td className="border px-4 py-2">{file.hospital}</td>
                  <td className="border px-4 py-2">{file.fileName}</td>
                  <td className="border px-4 py-2">{file.fileType}</td>
                  <td className="border px-4 py-2">{file.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentFiles;
