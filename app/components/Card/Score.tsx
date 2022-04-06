import { useCallback } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

type ScoreProps = {
  value: number;
};

const Score = (props: ScoreProps) => {
  const { value } = props;

  const calculateValue = useCallback(
    (value) => {
      return Math.ceil(value * 10);
    },
    [value]
  );

  return (
    <CircularProgressbar
      value={calculateValue(value)}
      text={`${calculateValue(value)}%`}
      background={true}
      backgroundPadding={5}
      strokeWidth={5}
      styles={buildStyles({
        textSize: "1.7em",
        backgroundColor: "#000",
        textColor: "#fff",
        pathColor: `
          ${value > 6.5 ? "green" : value < 3.5 ? "red" : "orange"}
        `,
      })}
    />
  );
};

export default Score;
