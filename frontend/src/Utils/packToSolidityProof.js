import { ethers } from "ethers";
export const Proofa = (Proof) => {
  return [
    ethers.BigNumber.from(Proof.pi_a[0])._hex,
    ethers.BigNumber.from(Proof.pi_a[1])._hex,
  ];
};
export const Proofb = (Proof) => {
  return [
    [
      ethers.BigNumber.from(Proof.pi_b[0][1])._hex,
      ethers.BigNumber.from(Proof.pi_b[0][0])._hex,
    ],
    [
      ethers.BigNumber.from(Proof.pi_b[1][1])._hex,
      ethers.BigNumber.from(Proof.pi_b[1][0])._hex,
    ],
  ];
};
export const Proofc = (Proof) => {
  return [
    ethers.BigNumber.from(Proof.pi_c[0])._hex,
    ethers.BigNumber.from(Proof.pi_c[1])._hex,
  ];
};
