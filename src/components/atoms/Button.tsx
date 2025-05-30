import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
  secondary: "text-indigo-600 hover:text-indigo-500 focus-visible:outline-indigo-600",
  danger: "text-red-600 hover:text-red-500 focus-visible:outline-red-600",
  ghost: "text-gray-300 hover:bg-gray-700 hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-2 text-base",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const buttonStyles = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className
  );

  return (
    <button className={buttonStyles} disabled={disabled} {...props}>
      {leftIcon && <span className='mr-2'>{leftIcon}</span>}
      {children}
      {rightIcon && <span className='ml-2'>{rightIcon}</span>}
    </button>
  );
};
