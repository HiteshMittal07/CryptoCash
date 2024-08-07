import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Router from "./routes/Router";
import Header from "./Components/Header";
function App() {
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
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
