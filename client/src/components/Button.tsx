interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
    success: "bg-green-500 hover:bg-green-600",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-white w-full p-2 rounded transition-colors ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};
