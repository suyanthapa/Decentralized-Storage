import { useState } from "react";
import { ethers } from "ethers";

const SendMoney = ({ contractInstance }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSendMoney = async () => {
    setError(null);
    setSuccess(null);

    if (!ethers.utils.isAddress(address)) {
      setError("Invalid recipient address");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      setError("Invalid amount");
      return;
    }

    if (contractInstance) {
      setLoading(true);
      try {
        const transaction = await contractInstance.sendMoney(address, { value: ethers.utils.parseEther(amount) });
        await transaction.wait();
        setSuccess("Transaction successful");
        console.log("Transaction successful:", transaction);
      } catch (error) {
        console.error("Error sending money:", error);
        setError("Error sending money: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Contract instance is not set");
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
      <button
        onClick={handleSendMoney}
        className="bg-black text-white px-3 py-2 rounded-md ml-5"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Money"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default SendMoney;
