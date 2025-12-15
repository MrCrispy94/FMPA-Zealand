
import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({ className, ...props }) => {
  const baseClasses = 'bg-gray-700/50 border border-gray-600 text-gray-200 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5';
  return <select className={`${baseClasses} ${className}`} {...props} />;
};

export default Select;