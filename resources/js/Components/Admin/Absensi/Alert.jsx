import React from 'react';

const variants = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-600',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    text: 'text-yellow-800',
    icon: 'text-yellow-600',
  },
  success: {
    container: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon: 'text-green-600',
  },
  danger: {
    container: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    icon: 'text-red-600',
  },
  gray: {
    container: 'bg-gray-50 border-gray-200',
    text: 'text-gray-600',
    icon: 'text-gray-400',
  },
};

export default function Alert({ 
  children, 
  variant = 'info', 
  icon,
  title,
  className = '' 
}) {
  const style = variants[variant] || variants.info;

  return (
    <div className={`border rounded-lg p-3 ${style.container} ${className}`}>
      <div className={`text-xs ${style.text} flex items-start gap-2`}>
        {icon && (
          <div className={`w-4 h-4 mt-0.5 flex-shrink-0 ${style.icon}`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          {title && <strong className="block mb-1">{title}</strong>}
          {children}
        </div>
      </div>
    </div>
  );
}