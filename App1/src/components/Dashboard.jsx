import React from 'react';
import jpg from "../assets/jpg.png"; // Path to your JPG icon
import png from "../assets/png.png"; // Path to your PNG icon
import dicon from "../assets/dicon.png"; // Default icon for other file types
import pdf from "../assets/pdf.png";
import pptx from "../assets/pptx.png";

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
    <div className='bg-gray-700 h-screen text-white pl-8'>
      <h2 className='text-xl font-bold pt-8 pb-5'>Recent Files</h2>
      <table className='bg-gray-200 w-1/2 rounded-lg text-black'>
        <thead>
          <tr className='text-left'>
            <th>Hospital</th>
            <th>File</th>
            <th>File Type</th>
            <th>Uploaded on</th>
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
  );
};

export default Dashboard;
