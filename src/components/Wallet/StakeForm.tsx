import React, { useEffect, useState } from "react";

import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core";
import { useNotifications } from "@usedapp/core";
import { utils } from "ethers";
import { Alert } from "@material-ui/lab";

import { Token } from "../Main";
import { useStakeTokens } from "../../hooks";

export interface StakeFormProps {
  token: Token;
}

export const StakeForm = ({ token }: StakeFormProps) => {
  const { address: tokenAddress } = token;
  const { notifications } = useNotifications();

  const [amount, setAmount] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount =
      event.target.value === "" ? 0 : parseInt(event.target.value);
    setAmount(newAmount);
  };

  const { approveAndStake, state } = useStakeTokens(tokenAddress);

  const handleStakeSubmit = () => {
    const amountAsWei = utils.parseEther(amount.toString());
    return approveAndStake(amountAsWei.toString());
  };

  const isMining = state.status === "Mining";
  const [showErc20ApprovalSuccess, setShowErc20ApprovalState] = useState(false);
  const [showStakeTokenSuccess, setShowStakeTokenSucces] = useState(false);

  const handleCloseSnack = () => {
    setShowErc20ApprovalState(false);
    setShowStakeTokenSucces(false);
  };
  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Approve ERC20 Transfer"
      ).length > 0
    ) {
      setShowErc20ApprovalState(true);
      setShowStakeTokenSucces(false);
    }

    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Stake Tokens"
      ).length > 0
    ) {
      setShowErc20ApprovalState(false);
      setShowStakeTokenSucces(true);
    }
  }, [notifications, showErc20ApprovalSuccess, showStakeTokenSuccess]);

  return (
    <React.Fragment>
      <div>
        <Input onChange={handleInputChange} />
        <Button
          onClick={handleStakeSubmit}
          color="primary"
          size="large"
          disabled={isMining}
        >
          {isMining ? <CircularProgress size={26} /> : "STAKE!"}
        </Button>
      </div>

      <Snackbar
        open={showErc20ApprovalSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved! Now approve the 2nd transaction
        </Alert>
      </Snackbar>
      <Snackbar
        open={showStakeTokenSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Tokens Staked
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
