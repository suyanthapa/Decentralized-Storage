import React from 'react'

const Dashboard = ({hospitalNames , fileDetails}) => {
  return (
    <div className='bg-gray-700 h-screen text-white pl-8 '>
     
      <h2 className='text-xl font-bold  pt-8 pb-5'>Recent Files</h2>
      <table
      className=' bg-gray-200 w-1/2 rounded-lg  text-black'>
        <thead>
          <tr className='text-left'>
            <th>Hospital</th>
            <th>File Name</th>
            <th>File Type</th> 
            <th>Created on</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {fileDetails.map((details,index)=>(
            <tr key={index}>
              <td>{hospitalNames[index] || 'N/A'}</td>
              <td>{details.name}</td>
              <td>{details.extension}</td>
              <td>Jan 11, 2024</td>
              <td>1mb</td>
            </tr>
          ))}
        </tbody>

      </table>
        
      
      
    </div>
  )
}

export default Dashboard;
