import React from 'react';

export default function FormCheckbox({ 
  label, 
  description,
  name,
  checked,
  onChange,
  disabled = false,
  className = '',
  ...props 
}) {
  return (
    <div className={`flex items-start ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
        {...props}
      />
      <div className="ml-3">
        {label && (
          <label className="block text-sm font-medium text-gray-900">
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-gray-600 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
