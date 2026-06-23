import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ className = "", ...props }) => {
  return (
    <select
      className={`
        bg-[#ADEED9]
        text-black
        hover:bg-[#56DFCF]
        border border-[#0ABAB5]
        rounded-xl
        px-4 py-2
        text-base
        transition
        font-md
        cursor-pointer
        ${className}
      `}
      {...props}
    />
  );
};
