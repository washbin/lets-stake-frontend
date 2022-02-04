import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline-grid",
    gridTemplateColumns: "auto auto auto",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  tokenImg: {
    width: "32px",
  },
  amount: {
    fontWeight: 700,
  },
}));

interface BalanceMessageProps {
  label: string;
  amount: number;
  tokenImageSrc: string;
}

export const BalanceMessage = ({
  label,
  amount,
  tokenImageSrc,
}: BalanceMessageProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>{label}</div>
      <img className={classes.tokenImg} alt="token logo" src={tokenImageSrc} />
      <div className={classes.amount}>{amount}</div>
    </div>
  );
};
