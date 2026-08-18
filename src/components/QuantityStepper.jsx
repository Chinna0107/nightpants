import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../utils/cn';

export function QuantityStepper({ quantity, onIncrease, onDecrease, className }) {
  return (
    <div className={cn("flex items-center gap-3 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm w-fit", className)}>
      <button 
        onClick={onDecrease}
        className="w-6 h-6 flex items-center justify-center rounded-full text-gray-900 hover:bg-gray-100 disabled:opacity-50"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
      <button 
        onClick={onIncrease}
        className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-900 hover:bg-orange-100 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
