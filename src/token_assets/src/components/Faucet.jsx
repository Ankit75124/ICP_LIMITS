import React, { useState } from "react";
import { token,canisterId, createActor} from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";


function Faucet() {
  
  const [isDisabled, setDisabled] =useState(false);
  const [buttonText, setText] =useState("CLICK HERE");


  async function handleClick(event) {
    setDisabled(true);

    const authClient= await AuthClient.create();
    const identity = await authClient.getIdentity()

    const authenticatedCanister =createActor(canisterId,{
      agentOptions:{
        identity,
      },
    })


    const result =await token.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Please click the button below to collect your free Limits Token.</label>
      <p className="trade-buttons">
        <button id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
