import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-sm hover:shadow-md focus:ring-gray-500",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm gap-2",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-3",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      ) : (
        icon && <span>{icon}</span>
      )}
      <span>{children}</span>
    </motion.button>
  );
}
