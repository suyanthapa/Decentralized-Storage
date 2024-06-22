import { useState } from "react";

const Hero = ({ name, getMyName, contractInstance }) => {
    const [newName, setNewName] = useState('Ram');

    const setMyName = async() => {
        const setName = await contractInstance.setName(newName);
    }

  return (
    <div className="text-center text-2xl text-black font-bold mt-10">
      <p className="">Name: {name}</p>
      <button
        onClick={getMyName}
        className="bg-blue-300 px-3 py-2 rounded-md hover:bg-blue-800 mt-5"
      >
        get Name
      </button>

      <div className="mt-20 space-y-5">
        <p>Set Name Function</p>
        <input
          onChange={(e) => setNewName(e.target.value)}
          name="Address"
          placeholder="Address"
          required
          type="text"
        />
        <button onClick={setMyName} className="bg-black text-white px-3 py-2 rounded-md ml-5">Set Name</button>
      </div>
    </div>
  );
};

export default Hero;