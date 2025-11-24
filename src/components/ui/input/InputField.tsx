import type { FC } from "react";
import type { InputProps } from "../../../utilities/type";
import { useData } from "../../../utilities/useData";

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
}) => {
  const { darkMode } = useData();

  // Determine input styles based on state
  let inputClasses = `h-10 w-full rounded-lg border appearance-none px-2 py-2 text-sm shadow-theme-xs placeholder:text-gray-400 
  focus:outline-hidden focus:ring-3 ${className}`;

  // Add styles for different states
  if (disabled) {
    inputClasses += darkMode
      ? ` text-gray-400 border-gray-700 bg-gray-800 cursor-not-allowed`
      : ` text-gray-500 border-gray-300 cursor-not-allowed`;
  } else if (error) {
    inputClasses += darkMode
      ? ` text-error-400 border-error-500`
      : ` text-error-800 border-error-500`;
  } else if (success) {
    inputClasses += darkMode
      ? ` text-success-400 border-success-500`
      : ` text-success-500 border-success-400`;
  } else {
    // Default state
    inputClasses += darkMode
      ? ` bg-gray-900 text-white border-gray-700 
          focus:border-[#94E561] focus:ring-[#94E561]/20`
      : ` bg-transparent text-gray-800 border-gray-300 
          focus:border-[#94E561] focus:ring-[#94E561]/20`;
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />

      {/* Optional Hint Text */}
      {hint && (
        <p
          className={`mt-1.5 text-xs ${error
            ? "text-error-500"
            : success
              ? "text-success-500"
              : darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;