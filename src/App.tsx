import { useCallback, useEffect, useState } from "react";
import logo from "./axelar-logo-horizontal-white.svg";
import "./App.css";
import {
  GetDepositAddressDto,
  GetDepositAddressPayload,
  TransferAssetBridge,
} from "@axelar-network/axelarjs-sdk";

const environment = "testnet";

const api = new TransferAssetBridge(environment);

function App() {
  const [depositAddr, setDepositAddr] = useState("");

  useEffect(() => {
    (window as any)?.ethereum?.enable();
  });

  const getDepositAddress = useCallback(
    async (destinationAddress?: string) => {
      const payload: GetDepositAddressPayload = {
        fromChain: "axelar",
        toChain: "avalanche",
        asset: "uaxl",
        destinationAddress: destinationAddress || "0x74Ccd7d9F1F40417C6F7fD1151429a2c44c34e6d"
    };
      const requestPayload: GetDepositAddressDto = { payload } as GetDepositAddressDto
      const linkAddress: string = await api.getDepositAddress(requestPayload);
      setDepositAddr(linkAddress);
    },
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ width: `75%` }}>Generate a link address for a transaction to initiate the transfer of AXL testnet tokens from Axelar to Avalanche network.</div>
        <br />
        <button style={{ cursor: `pointer` }} onClick={() => getDepositAddress()}>
          Generate!
        </button>
        {depositAddr && (
          <div style={{ fontSize: `0.8em` }}>
            <br />
            <div>ONE TIME DEPOSIT ADDRESS GENERATED: </div>
            <br />
            <div style={{ color: `green`, fontWeight: `bolder`, fontSize: `1.1em` }}>{depositAddr}</div>
            <br />
            <div>
              Tell your users they will have to make a deposit of AXL tokens into this
              one-time address.
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;