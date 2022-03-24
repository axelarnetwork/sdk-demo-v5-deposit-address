import { useState } from "react";
import {
  GetDepositAddressPayload,
  TransferAssetBridge,
} from "@axelar-network/axelarjs-sdk";
import { BarLoader } from "react-spinners";
import logo from "./axelar-logo-horizontal-white.svg";
import "./App.css";

const environment = "testnet";
const api = new TransferAssetBridge(environment);

// enable metamask
(window as any)?.ethereum?.enable();

function App() {
  const [loading, setLoading] = useState(false);
  const [depositAddr, setDepositAddr] = useState("");

  async function handleOnGetDepositAddress(destinationAddress?: string) {
    setLoading(true);

    // construct payload
    const dto: GetDepositAddressPayload = {
      fromChain: "axelar",
      toChain: "avalanche",
      asset: "uaxl",
      destinationAddress:
        destinationAddress || "0x74Ccd7d9F1F40417C6F7fD1151429a2c44c34e6d",
    };

    // request deposit address
    const depositAddress = await api.getDepositAddress({ payload: dto });

    // save deposit address in state
    if (depositAddress) {
      setDepositAddr(depositAddress);
    }

    setLoading(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ width: `75%` }}>
          Generate a link address for a transaction to initiate the transfer of
          AXL testnet tokens from Axelar to Avalanche network.
        </div>
        <br />
        <button
          style={{ cursor: "pointer", marginBottom: 50 }}
          onClick={() => handleOnGetDepositAddress()}
        >
          Generate!
        </button>
        {loading && <BarLoader color="#36d7b7" width={200} />}
        {depositAddr && (
          <div style={{ fontSize: `0.8em` }}>
            <br />
            <div>ONE TIME DEPOSIT ADDRESS GENERATED: </div>
            <br />
            <div
              style={{
                color: `green`,
                fontWeight: `bolder`,
                fontSize: `1.1em`,
              }}
            >
              {depositAddr}
            </div>
            <br />
            <div>
              Tell your users they will have to make a deposit of AXL tokens
              into this one-time address.
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
