import React from 'react';
import jpg from "../assets/jpg.png"; // Path to your JPG icon
import png from "../assets/png.png"; // Path to your PNG icon
import dicon from "../assets/dicon.png"; // Default icon for other file types
import pdf from "../assets/pdf.png";
import pptx from "../assets/pptx.png";
import { FaCloudUploadAlt, FaFolderOpen } from 'react-icons/fa';

const Dashboard = ({ hospitalNames, fileDetails }) => {
  const getFileTypeLabel = (extension) => {
    if (['jpg', 'jpeg', 'png'].includes(extension.toLowerCase())) {
      return 'Image';
    }

    if (['pdf', 'pptx'].includes(extension.toLowerCase())) {
      return 'Document';
    }
    return extension.toUpperCase();
  };

  const getFileIcon = (extension) => {
    switch (extension.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        return jpg;
      case 'png':
        return png;
      case 'pdf':
        return pdf; 
      case 'pptx':
        return pptx; 
      default:
        return dicon;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Files</h2>
          {/* <a href="#" className="text-blue-500">View all</a> */}
        </div>
        <div className="bg-white w-full p-6 rounded-lg shadow-md">
          <table className="w-full">
            <thead className="border-b-2">
              <tr>
                <th className="text-left p-3">Hospital's Name</th>
                <th className="text-left p-3">File Name</th>
                <th className="text-left p-3">File Type</th>
                <th className="text-left p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {fileDetails.map((details, index) => (
                <tr key={index}>
                  <td>{hospitalNames[index] || 'N/A'}</td>
                  <td>{details.name}</td>
                  <td className='flex items-center'>
                    <img
                      src={getFileIcon(details.extension)}
                      alt="File Type Icon"
                      className='w-6 h-6 mr-2'
                    />
                    {getFileTypeLabel(details.extension)}
                  </td>
                  <td>{details.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vertical Line Separator */}
      <div className="w-px bg-gray-300 mx-4"></div>

      {/* Right Sidebar */}
      <div className="w-1/5 p-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold">Storage</h3>
              <p className="text-sm text-gray-600">37.51 GB of 150 GB used</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-blue-500">25%</span>
            </div>
          </div>

          {/* Need More Storage Section */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-bold text-blue-800">Need more storage?</h3>
            <p className="text-blue-700 text-sm mt-2">
              Unlock limitless possibilities with more storage.
            </p>
            <button className="mt-4 bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
