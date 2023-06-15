import styles from "./styles.module.css";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

type IProps = {
    waitTrandChange: boolean;
    activeCurrencyPrices: string[];
    handleWaitTrendChange: any;
}

export const WaitButton = ({
  waitTrandChange,
  activeCurrencyPrices,
  handleWaitTrendChange
}: IProps) => {
  return (
    <Badge
      badgeContent={
        waitTrandChange ? (
          <DoneIcon fontSize="small" />
        ) : (
          <AddIcon fontSize="small" />
        )
      }
      color="success"
    >
      <button
        disabled={activeCurrencyPrices.length === 0}
        className={styles.button}
        type="button"
        onClick={handleWaitTrendChange}
      >
        Wait for trend change
      </button>
    </Badge>
  );
};
