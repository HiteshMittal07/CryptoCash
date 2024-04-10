import React from "react";
import "../Styles/Card.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="card1">
      <h1
        className="text-light mb-3 fw-bolder homeHead"
        style={{ fontSize: "60px" }}
      >
        TO CREATE A NOTE
      </h1>
      <h3 className="fw-bold">SELECT NETWORK</h3>
      <div className="card__container">
        <Link
          to="/create"
          state={{ from: "11155111" }}
          className="card__article"
        >
          <div className="card__data">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
              alt="card image"
              className="card__img"
              style={{ height: "320px" }}
            />

            <h1 className="card__title">Sepolia Testnet</h1>
            <p className="card__description">Create Notes</p>
          </div>

          <div className="card__shapes">
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
          </div>
        </Link>

        <Link to="/create" state={{ from: "534351" }} className="card__article">
          <div className="card__data">
            <img
              src="https://static.chainbroker.io/mediafiles/projects/scroll/scroll.jpeg"
              alt="card image"
              className="card__img"
              style={{ height: "320px" }}
            />

            <h1 className="card__title">Scroll Sepolia</h1>
            <p className="card__description">Create Notes</p>
          </div>

          <div className="card__shapes">
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
          </div>
        </Link>

        <Link to="/create" state={{ from: "421614" }} className="card__article">
          <div className="card__data">
            <img
              src="https://cryptologos.cc/logos/arbitrum-arb-logo.png"
              alt="card image"
              className="card__img"
              style={{ height: "280px" }}
            />

            <h1 className="card__title" style={{ marginTop: "2rem" }}>
              Arbitrum Sepolia
            </h1>
            <p className="card__description">Create Notes</p>
          </div>

          <div className="card__shapes">
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
