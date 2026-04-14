
import React from 'react';
import type { SliderInputProps } from '../types';

const SliderInput: React.FC<SliderInputProps> = ({ label, value, min, max, step, unit, onChange, icon }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="font-semibold text-gray-300 flex items-center gap-2">
                    {icon}
                    {label}
                </label>
                <span className="font-orbitron text-lg font-bold text-cyan-400 bg-gray-700/50 px-3 py-1 rounded-md">
                    {value} {unit}
                </span>
            </div>
            <input 
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
        </div>
    );
};

export default SliderInput;
