import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Router from "./routes/Router";
import Header from "./Components/Header";
import { getWeb3Provider, requestAccounts } from "./web3/web3";
function App() {
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = getWeb3Provider();
      const address = await requestAccounts(provider);
      localStorage.setItem("account", address);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="my-background">
      <Header connectWallet={connectWallet} />
      <Router />
    </div>
  );
}

export default App;
