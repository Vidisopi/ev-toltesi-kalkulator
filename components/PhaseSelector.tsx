
import React from 'react';
import type { PhaseSelectorProps } from '../types';
import { Icons } from './Icons';

const PhaseSelector: React.FC<PhaseSelectorProps> = ({ selectedPhase, onPhaseChange }) => {
    const baseClasses = "w-full text-center py-3 px-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2";
    const activeClasses = "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30";
    const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";

    return (
        <div>
            <label className="font-semibold text-gray-300 mb-2 block flex items-center gap-2">
                <Icons.PhaseIcon className="w-6 h-6 text-cyan-400" />
                Fázisok száma
            </label>
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => onPhaseChange(1)}
                    className={`${baseClasses} ${selectedPhase === 1 ? activeClasses : inactiveClasses}`}
                >
                    1 Fázis
                </button>
                <button 
                    onClick={() => onPhaseChange(3)}
                    className={`${baseClasses} ${selectedPhase === 3 ? activeClasses : inactiveClasses}`}
                >
                    3 Fázis
                </button>
            </div>
        </div>
    );
};

export default PhaseSelector;
