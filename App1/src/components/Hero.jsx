import { useState } from "react";

const Hero = ({ name, getMyName, contractInstance }) => {
  const [newName, setNewName] = useState(''); // State to store the new name input

  const setMyName = async() => {
    const setName = await contractInstance.setName(newName); // Call the setName function from the smart contract
  }

  return (
    <div className="text-center text-2xl text-black font-bold mt-10">
      <p className="">Name: {name}</p> {/* Display the current name */}
      <button
        onClick={getMyName} // Get name from the smart contract when clicked
        className="bg-blue-300 px-3 py-2 rounded-md hover:bg-blue-800 mt-5"
      >
        get Name
      </button>

      <div className="mt-20 space-y-5">
        <p>Set Name Function</p>
        <input
          onChange={(e) => setNewName(e.target.value)} // Set the new name input state
          name="Address"
          placeholder="Address"
          required
          type="text"
        />
        <button onClick={setMyName} className="bg-black text-white px-3 py-2 rounded-md ml-5">Set Name</button>
        {/* Set the new name in the smart contract when clicked */}
      </div>
    </div>
  );
};

export default Hero;
