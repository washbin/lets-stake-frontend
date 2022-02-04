import React, { useState } from "react";

import { Box, Tab, makeStyles } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

import { Token } from "../Main";
import { WalletBalance } from "./WalletBalace";
import { StakeForm } from "./StakeForm";

interface WalletInfoProps {
  supportedTokens: Array<Token>;
}

const useStyles = makeStyles((theme) => ({
  tabContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
  },
  box: {
    backgroundColor: "white",
    borderRadius: "25px",
  },
  header: {
    color: "white",
  },
}));

export const WalletInfo = ({ supportedTokens }: WalletInfoProps) => {
  const classes = useStyles();

  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTokenIndex(parseInt(newValue));
  };

  return (
    <Box>
      <h1 className={classes.header}> Your Wallet!</h1>
      <Box className={classes.box}>
        <TabContext value={selectedTokenIndex.toString()}>
          <TabList onChange={handleChange} aria-label="stake from tabs">
            {supportedTokens.map((token, index) => (
              <Tab label={token.name} value={index.toString()} key={index} />
            ))}
          </TabList>
          {supportedTokens.map((token, index) => (
            <TabPanel value={index.toString()} key={index}>
              <div className={classes.tabContent}>
                <WalletBalance token={supportedTokens[selectedTokenIndex]} />
                <StakeForm token={supportedTokens[selectedTokenIndex]} />
              </div>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Box>
  );
};
