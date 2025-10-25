import React from 'react';

export default function EmptyState({ 
  icon, 
  title, 
  description,
  action,
  className = '' 
}) {
  return (
    <div className={`text-center py-12 ${className}`}>
      {icon && (
        <div className="w-16 h-16 text-gray-300 mx-auto mb-4">
          {icon}
        </div>
      )}
      {title && <p className="text-gray-500 text-lg">{title}</p>}
      {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}