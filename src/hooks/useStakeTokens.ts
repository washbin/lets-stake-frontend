import { useEffect, useState } from "react";

import { useContractFunction, useEthers } from "@usedapp/core";
import { constants, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";

import tokenFarm from "../contract-info/contracts/TokenFarm.json";
import networkMapping from "../contract-info/deployments/map.json";
import erc20 from "../contract-info/contracts/MockWETH.json";

export const useStakeTokens = (tokenAddress: string) => {
  const { chainId } = useEthers();
  const { abi } = tokenFarm;
  const tokenFarmAddress: string = chainId
    ? (networkMapping as any)[chainId.toString()]["TokenFarm"][0]
    : constants.AddressZero;
  const tokenFarmInterface = new utils.Interface(abi);
  const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface);

  const erc20ABI = erc20.abi;
  const erc20Intreface = new utils.Interface(erc20ABI);
  const erc20Contract = new Contract(tokenAddress, erc20Intreface);

  const { send: approveErc20send, state: approveErc20State } =
    useContractFunction(erc20Contract, "approve", {
      transactionName: "Approve ERC20 Transfer",
    });
  const approveAndStake = (amount: string) => {
    setAmountToStake(amount);
    approveErc20send(tokenFarmAddress, amount);
  };

  const { send: stakeSend, state: stakeState } = useContractFunction(
    tokenFarmContract,
    "stakeTokens",
    { transactionName: "Stake Tokens" }
  );
  const [amountToStake, setAmountToStake] = useState("0");
  useEffect(() => {
    if (approveErc20State.status === "Success") {
      stakeSend(amountToStake, tokenAddress);
    }
  }, [approveErc20State, amountToStake, tokenAddress]);

  const [state, setState] = useState(approveErc20State);

  useEffect(() => {
    if (approveErc20State.status === "Success") {
      setState(stakeState);
    } else {
      setState(approveErc20State);
    }
  }, [approveErc20State, stakeState]);

  return { approveAndStake, state };
};
