import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from './constant/ABI.json';
import Header from "./components/Header";
import SendMoney from "./components/SendMoney";
import TransactionList from "./components/TransactionList";
import UploadFiles from "./components/UploadFiles";
import Homepage from "./components/Homepage";

function App() {
  const [account, setAccount] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeSection, setActiveSection] = useState('home');

  const contractAddress = "0x3f03192D3AE4BBBFdCb37359807fd3E7387d9507";

  const initializeContract = async (account) => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        setContractInstance(contract);

        contract.on("MoneySent", (from, to, amount, timestamp) => {
          setTransactions(prevTransactions => [
            ...prevTransactions,
            { 
              from, 
              to, 
              amount: ethers.utils.formatEther(amount), 
              timestamp: new Date(timestamp * 1000).toLocaleString() 
            }
          ]);
        });
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    } else {
      console.error("Ethereum object doesn't exist!");
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        initializeContract(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("Ethereum object doesn't exist!");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setContractInstance(null);
    setTransactions([]);
  };

  return (
    <div className="bg-cyan-800 min-h-screen">
      <Header
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        account={account}
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />

      <div >
        {activeSection === 'home' && <Homepage />}
        {activeSection === 'upload' && <UploadFiles account={account} contractInstance={contractInstance} />}
        {activeSection === 'transfer' && (
          <div>
            <SendMoney contractInstance={contractInstance} />
            <TransactionList transactions={transactions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
