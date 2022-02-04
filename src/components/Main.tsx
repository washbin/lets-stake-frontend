import React from "react";
import { useEthers } from "@usedapp/core";
import { constants } from "ethers";
import { makeStyles } from "@material-ui/core";

import { chainIdToNetworkName } from "../helper";
import networkMapping from "../contract-info/deployments/map.json";
import brownieConfig from "../brownie-config.json";
import { WalletInfo } from "./Wallet";

import swap from "../swap.png";
import eth from "../eth.png";
import dai from "../dai.png";

export type Token = {
  image: string;
  address: string;
  name: string;
};

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    textAlign: "center",
    padding: theme.spacing(4),
  },
}));

export const Main = () => {
  const classes = useStyles();

  const { chainId } = useEthers();
  const networkName = chainId
    ? chainIdToNetworkName[chainId.toString()]
    : "dev";

  const swapTokenAddress: string = chainId
    ? (networkMapping as any)[chainId.toString()]["SwapToken"][0]
    : constants.AddressZero;
  const wethTokenAddress: string = chainId
    ? (brownieConfig as any)["networks"][networkName]["weth_token"]
    : constants.AddressZero;
  const fauTokenAddress: string = chainId
    ? (brownieConfig as any)["networks"][networkName]["fau_token"]
    : constants.AddressZero;

  const supportedTokens: Array<Token> = [
    {
      image: swap,
      address: swapTokenAddress,
      name: "SWAP",
    },
    {
      image: eth,
      address: wethTokenAddress,
      name: "WETH",
    },
    {
      image: dai,
      address: fauTokenAddress,
      name: "FAU",
    },
  ];

  return (
    <React.Fragment>
      <h2 className={classes.title}>Swap Token App</h2>
      <WalletInfo supportedTokens={supportedTokens} />;
    </React.Fragment>
  );
};
