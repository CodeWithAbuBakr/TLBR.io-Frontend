import React from "react";
import { FiCheck } from "react-icons/fi";
import type { CheckboxProps } from "../../../utilities/type";

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  id,
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center space-x-3 cursor-pointer select-none ${disabled ? "cursor-not-allowed opacity-60" : ""
        }`}
    >
      <div className="relative w-5 h-5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className={`w-5 h-5 appearance-none border border-gray-300 rounded-md cursor-pointer 
          focus:outline-none checked:border-transparent 
          ${checked ? "bg-[#94E561] dark:bg-[#94E561]" : "bg-transparent"} 
          dark:border-gray-600
          ${disabled ? "opacity-60 cursor-not-allowed" : ""} 
          ${className}`}
        />

        {checked && (
          <FiCheck
            className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            size={14}
          />
        )}
      </div>

      {label && (
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;