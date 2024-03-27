import React from "react";
import { Link } from "react-router-dom";
const Header = (props) => {
  const truncateWalletAddress = (address, length = 4) => {
    if (!address) return "";
    const start = address.substring(0, length);
    const end = address.substring(address.length - length);
    return `${start}...${end}`;
  };
  const address = localStorage.getItem("account");
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark text-bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          CryptoCash
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
            {!window.ethereum.isConnected() ? (
              <li className="nav-item">
                <button className="btn btn-light" onClick={props.connectWallet}>
                  Connect Wallet
                </button>
              </li>
            ) : (
              <li className="nav-item ms-1">
                <button className="btn btn-light" onClick={props.connectWallet}>
                  {truncateWalletAddress(address)}
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
