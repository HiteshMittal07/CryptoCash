import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWeb3Provider, requestAccounts } from "../web3/web3";
import logo from "../Img/image.png";
const Header = () => {
  const [account, setAccount] = useState(null);
  const truncateWalletAddress = async (address, length = 4) => {
    if (!address) return "";
    const start = address.substring(0, length);
    const end = address.substring(address.length - length);
    setAccount(`${start}...${end}`);
  };
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = getWeb3Provider();
      const address = await requestAccounts(provider);
      truncateWalletAddress(address);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const connect = async () => {
      const provider = getWeb3Provider();
      try {
        const address = await requestAccounts(provider);
        truncateWalletAddress(address);
      } catch (error) {
        console.log(error);
      }
    };
    connect();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark text-bg-dark bg-transparent shadow">
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ fontSize: "25px" }}>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <span className="ms-1">CryptoCash</span>
        </Link>
        <button
          className="navbar-toggler"
          data-bs-target="#navDrop"
          data-bs-toggle="collapse"
          aria-controls="navDrop"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navDrop">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/verify" className="nav-link">
                Verify Note
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/withdraw" className="nav-link">
                Withdraw Note
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/info" className="nav-link">
                Info
              </Link>
            </li>
            {!account ? (
              <li className="nav-item">
                <button className="btn btn-light" onClick={connectWallet}>
                  Connect Wallet
                </button>
              </li>
            ) : (
              <li className="nav-item ms-1">
                <button className="btn btn-light" onClick={connectWallet}>
                  {account}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
