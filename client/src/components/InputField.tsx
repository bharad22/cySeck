interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  className = "",
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className={`border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
  />
);
