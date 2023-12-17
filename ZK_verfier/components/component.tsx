import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import React from 'react';
import { Noir } from '../utils/noir';
import circuit from "../circuits/target/noirstarter.json"

function Component() {
  const [input, setInput] = useState({ x: 0, y: 0 });
  const [proof, setProof] = useState(Uint8Array.from([]));
  const [noir, setNoir] = useState(new Noir(circuit));

  // Handles input state
  const handleChange = e => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Calculates proof
  const calculateProof = async () => {
    const calc = new Promis e(async (resolve, reject) => {
      const witness = await noir.generateWitness(input);
      const proof = await noir.generateProof(witness);
      setProof(proof);
      resolve(proof);
    });
    toast.promise(calc, {
      pending: 'Calculating proof...',
      success: 'Proof calculated!',
      error: 'Error calculating proof',
    });
  };

  const verifyProof = async () => {
    const verifyOffChain = new Promise(async (resolve, reject) => {
      if (proof) {
        const verification = await noir.verifyProof(proof);
        resolve(verification);
      }
    });

    toast.promise(verifyOffChain, {
      pending: 'Verifying proof off-chain...',
      success: 'Proof verified off-chain!',
      error: 'Error verifying proof',
    });
  };

  // Verifier the proof if there's one in state
  useEffect(() => {
    if (proof.length > 0) {
      verifyProof();

      return () => {
        noir.destroy();
      };
    }
  }, [proof]);

  const initNoir = async () => {
    const init = new Promise(async (resolve, reject) => {
      await noir.init();
      setNoir(noir);
      resolve(noir);
    });

    toast.promise(init, {
      pending: 'Initializing Noir...',
      success: 'Noir initialized!',
      error: 'Error initializing Noir',
    });
  };

  useEffect(() => {
    initNoir();
  }, []);

  return (
    <div className="gameContainer">
      <h1>verifying that crypto cash have the sufficent value so that it can be reedmed but </h1>
      <h2>This circuit checks balance of the account and the denomination of the crpto cash</h2>
      <p></p>
      <input name="x" type={'number'} onChange={handleChange} value={input.x} />
      <input name="y" type={'number'} onChange={handleChange} value={input.y} />
     
      <button onClick={calculateProof}>Calculate proof</button>
    </div>
  );
}

export default Component;
