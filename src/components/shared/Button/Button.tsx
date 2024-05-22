import "./Button.scss";

export enum ButtonTypes {
  Button = "button",
  Rest = "reset",
  Submit = "submit",
}
interface ButtonProps {
  label: string;
  type?: ButtonTypes;
  disabled?: boolean;
  className?: string;
  onButtonClick?: () => void;
}
export const Button: React.FC<ButtonProps> = ({
  label,
  type = ButtonTypes.Button,
  disabled = false,
  className,
  onButtonClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      id="start-btn"
      disabled={disabled}
      onClick={onButtonClick}
    >
      {label}
    </button>
  );
};
