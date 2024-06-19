import { useState } from "react";
// import BlockchainConstant from "./constant/ABI.json";
import Header from "./components/Header"; // Adjust path as necessary
import {ethers} from "ethers";

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(null); // Initialize balance as null

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);
       
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('MetaMask extension not detected');
    }
  };
  

  const disconnectWallet = () => {
    setAccount('');
    setBalance(null); // Reset balance to null when disconnecting
  };

  // const getWalletBalance = async (account) => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const balance = await provider.getBalance(account);
  //     console.log("Raw balance:", balance.toString());
  //     setBalance(ethers.utils.formatEther(balance));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  

  return (
    <div className="">
      <Header 
        connectWallet={connectWallet} 
        disconnectWallet={disconnectWallet} 
        account={account} 
        balance={balance} 
      />
      <br></br>

    </div>
    
  );
  
}

export default App;