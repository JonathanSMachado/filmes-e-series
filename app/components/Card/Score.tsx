import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import type { ScoreProps } from "./types";

export function Score(props: ScoreProps) {
  const value = props.value;
  const score = Math.ceil(value * 10);

  // const className = props.className ?? 'absolute top-2 right-2 w-12 h-12 z-40';

  return (
    <div
      className="transform-gpu transition-transform duration-500 ease-out"
      title="Pontuação (quanto maior melhor)"
    >
      <CircularProgressbar
        value={score}
        text={`${score}%`}
        background={true}
        backgroundPadding={2}
        strokeWidth={5}
        styles={buildStyles({
          textSize: "2rem",
          backgroundColor: "#000",
          textColor: "#FFF",
          trailColor: "#000",
          pathColor: `${value > 6.5 ? "green" : value < 3.5 ? "red" : "orange"}`,
        })}
      />
    </div>
  );
}
