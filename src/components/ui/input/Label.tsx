import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import type { LabelProps } from "../../../utilities/type";
import { useData } from "../../../utilities/useData";

const Label: FC<LabelProps> = ({ htmlFor, children, className }) => {
  const { darkMode } = useData();

  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        "mb-1.5 block text-xs font-medium",
        darkMode ? "text-gray-400" : "text-gray-700",
        className
      )}
    >
      {children}
    </label>
  );
};

export default Label;