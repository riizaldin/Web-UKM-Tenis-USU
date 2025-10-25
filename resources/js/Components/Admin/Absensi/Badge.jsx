import React from 'react';

const variants = {
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  gray: 'bg-gray-100 text-gray-600',
  indigo: 'bg-indigo-100 text-indigo-800',
};

export default function Badge({ 
  children, 
  variant = 'gray', 
  icon,
  dot = false,
  dotColor = 'bg-green-600',
  className = '' 
}) {
  const variantClasses = variants[variant] || variants.gray;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${variantClasses} ${className}`}>
      {dot && <div className={`w-2 h-2 ${dotColor} rounded-full animate-pulse`}></div>}
      {icon}
      {children}
    </span>
  );
}