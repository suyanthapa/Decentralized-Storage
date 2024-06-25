const Header = ({ connectWallet, disconnectWallet, account }) => {
  // Function to format the balance with a fixed number of decimal places
  const formatBalance = (balance) => {
    return parseFloat(balance).toFixed(4); // Adjust the number of decimal places as needed
  };

  return (
    <div className="w-full h-full mx-auto flex items-center justify-between bg-gray-600 text-white py-5 px-5">
      <h1 className="text-2xl font-bold">Name Changer</h1>
      <div className="flex justify-between items-center gap-6">
      <div>
        <p>
          Address: {account ? `${account.slice(0, 6)}....${account.slice(-4)}` : "Not connected"}
          {/* Display the connected account or "Not connected" if not connected */}
        </p>
      </div>

        {account ? (
          <button
            onClick={disconnectWallet} // Disconnect wallet when clicked
            className="bg-red-400 py-3 px-5 rounded-md hover:bg-red-600"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={connectWallet} // Connect wallet when clicked
            className="bg-blue-400 py-3 px-5 rounded-md hover:bg-blue-600"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};
export default Header;
