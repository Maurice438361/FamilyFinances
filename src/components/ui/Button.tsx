import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles = "font-md rounded transition";
  const variantStyles: Record<string, string> = {
    primary:
      "bg-[#ADEED9] text-black hover:bg-[#56DFCF] border-solid border border-[#0ABAB5] rounded-xl",
    secondary:
      "bg-[#56DFCF] text-black hover:bg-[#0ABAB5] border-solid border border-[#0ABAB5] rounded-xl",
  };
  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    />
  );
};
