interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
}) => {
  const sizes = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}
      />
    </div>
  );
};
