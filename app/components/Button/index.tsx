type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "neutral";
  size?: "small" | "medium" | "large";
  onclick?: () => void;
};

export default function Button(props: ButtonProps) {
  const { children, type, className, variant, size, onclick } = props;

  return (
    <button
      type={type ?? "button"}
      className={`btn btn-${variant ?? "primary"} btn-${size ?? "medium"} ${
        className ?? ""
      }`}
      {...(onclick && { onClick: onclick })}
    >
      {children}
    </button>
  );
}
