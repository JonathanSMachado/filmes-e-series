import { Link } from "react-router";
import type { ButtonProps } from "./ButtonProps";

export function Button({
  children,
  variant = "primary",
  to,
  isLoading,
  icon,
  iconRight,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variantStyles = {
    primary:
      "bg-cyan-600 text-white hover:bg-cyan-500 focus:ring-cyan-500 shadow-lg shadow-cyan-900/20",
    secondary:
      "bg-slate-700 text-white hover:bg-slate-600 focus:ring-slate-500",
    outline:
      "border-2 border-slate-700 text-slate-300 hover:bg-slate-800 focus:ring-slate-700",
    danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon && <span className="text-xl">{icon}</span>
      )}
      <span className={isLoading ? "opacity-80" : ""}>{children}</span>
      {!isLoading && iconRight && <span className="text-xl">{iconRight}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...rest}
    >
      {content}
    </button>
  );
}
