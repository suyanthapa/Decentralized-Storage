import React from 'react';

const UploadFiles = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="border-4 border-dashed border-gray-400 rounded-lg p-10 w-3/4 h-3/4 flex justify-center items-center bg-white">
        <div className="text-center">
          <p className="text-lg text-gray-700">Drag and drop your health records here</p>
          <p className="text-sm text-gray-500 mt-2">or click to select files from your computer</p>
          <input type="file" className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default UploadFiles;
