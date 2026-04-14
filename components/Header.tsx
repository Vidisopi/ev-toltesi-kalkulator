
import React from 'react';
import { Icons } from './Icons';

const Header: React.FC = () => {
    return (
        <header className="text-center w-full max-w-7xl">
            <div className="flex justify-center items-center gap-4">
                <Icons.EvStationIcon className="w-12 h-12 text-cyan-400" />
                <h1 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wider">
                    EV Töltési Idő Kalkulátor
                </h1>
            </div>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Becsülje meg elektromos autója töltési idejét otthoni hálózatán egyszerűen és gyorsan.
            </p>
        </header>
    );
};

export default Header;
