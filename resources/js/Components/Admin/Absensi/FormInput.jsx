import React from 'react';

export default function FormInput({ 
  label, 
  icon,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = '',
  options = [],
  children,
  ...props 
}) {
  const baseClass = `w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
    error ? 'border-red-500' : ''
  }`;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 items-center gap-2">
          {icon && <span className="w-4 h-4">{icon}</span>}
          {label}
        </label>
      )}

      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={baseClass}
          {...props}
        >
          {options && options.length > 0 ? (
            options.map((opt, idx) => {
              if (typeof opt === 'string') {
                return (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                );
              }

              return (
                <option key={idx} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              );
            })
          ) : (
            // fallback to children if provided
            children
          )}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={baseClass}
          {...props}
        />
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}