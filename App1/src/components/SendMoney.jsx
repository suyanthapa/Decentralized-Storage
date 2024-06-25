import { useState } from "react";

const SendMoney = ({ contractInstance }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSendMoney = async () => {
    if (contractInstance) {
      try {
        const transaction = await contractInstance.sendMoney(address, { value: ethers.utils.parseEther(amount) });
        await transaction.wait();
        console.log("Transaction successful:", transaction);
      } catch (error) {
        console.error("Error sending money:", error);
      }
    } else {
      console.log("Contract instance is not set");
    }
  };

  return (
    <div className="mt-20 space-y-5 text-center">
      <p className="text-2xl text-black font-bold">Send Money Function</p>
      <input
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        name="Address"
        placeholder="Recipient Address"
        required
        type="text"
        className="border p-2 rounded"
      />
      <input
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        name="Amount"
        placeholder="Amount in ETH"
        required
        type="text"
        className="border p-2 rounded ml-5"
      />
      <button onClick={handleSendMoney} className="bg-black text-white px-3 py-2 rounded-md ml-5">Send Money</button>
    </div>
  );
};

export default SendMoney;
