import React from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  color?: string;  // Tailwind color class
  disabled?: boolean;
}

export default function ActionButton({ label, onClick, color = 'bg-blue-500', disabled = false }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${color} 
        text-white 
        px-4 py-2 
        rounded 
        shadow-sm 
        hover:shadow-md 
        transition 
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {label}
    </button>
  );
}
