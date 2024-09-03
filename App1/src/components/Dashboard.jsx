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
    <div className="flex-1 p-6 h-screen bg-gray-100">
      
      
     
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Files</h2>
        <a href="#" className="text-blue-500">View all</a>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
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
  );
};

export default Dashboard;
