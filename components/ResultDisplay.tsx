import React from 'react';
import type { ResultDisplayProps } from '../types';
import { Icons } from './Icons';

const formatTime = (hours: number): string => {
  if (hours <= 0 || !isFinite(hours)) {
    return "0 perc";
  }
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  
  let result = '';
  if (h > 0) {
    result += `${h} óra `;
  }
  if (m > 0 || h === 0) {
    result += `${m} perc`;
  }
  return result.trim();
};

const ResultCard: React.FC<{ icon: JSX.Element; label: string; value: string; unit: string; accent?: string }> = ({ icon, label, value, unit, accent = 'cyan' }) => (
    <div className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4 border border-gray-700">
        <div className={`bg-${accent}-500/10 p-3 rounded-full`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="font-orbitron text-2xl font-bold text-white">
                {value} <span className={`text-lg text-${accent}-400`}>{unit}</span>
            </p>
        </div>
    </div>
);

const SolarResultCard: React.FC<{ icon: JSX.Element; label: string; value: string; unit: string }> = ({ icon, label, value, unit }) => (
    <div className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4 border border-gray-700">
        <div className="bg-purple-500/10 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="font-orbitron text-2xl font-bold text-white">
                {value} <span className="text-lg text-purple-400">{unit}</span>
            </p>
        </div>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
    chargingPower, 
    chargingTime, 
    energyToCharge, 
    chargingCost,
    monthlyEvCost,
    monthlyIceCost,
    monthlySavings,
    yearlySavings,
    isIceComparisonEnabled,
    solarParams,
    solarResult,
}) => {
    const formattedTime = formatTime(chargingTime);

    return (
        <div className="p-6 bg-gradient-to-br from-cyan-900/50 to-gray-900 rounded-xl border border-cyan-500/50 flex flex-col">
            <h2 className="text-3xl font-orbitron font-bold text-white mb-6 text-center">Eredmények</h2>
            
            <div className="space-y-8">
                {/* Charging Session Results */}
                <div className="space-y-4">
                    <h3 className="text-lg font-orbitron text-cyan-300 border-b border-cyan-500/30 pb-2">Töltési Munkamenet</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <ResultCard 
                            icon={<Icons.PowerIcon className="w-6 h-6 text-cyan-400" />}
                            label="Töltési teljesítmény"
                            value={chargingPower.toFixed(2)}
                            unit="kW"
                        />
                        <ResultCard 
                            icon={<Icons.EnergyIcon className="w-6 h-6 text-cyan-400" />}
                            label="Betáplálandó energia"
                            value={energyToCharge.toFixed(2)}
                            unit="kWh"
                        />
                        <ResultCard 
                            icon={<Icons.CurrencyForintIcon className="w-6 h-6 text-cyan-400" />}
                            label="Töltés teljes költsége"
                            value={chargingCost.toLocaleString('hu-HU', { maximumFractionDigits: 0 })}
                            unit="Ft"
                        />
                        <div className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20">
                            <div className="bg-cyan-500/10 p-3 rounded-full">
                                <Icons.ClockIcon className="w-8 h-8 text-cyan-300" />
                            </div>
                            <div>
                                <p className="text-gray-300 text-md">Becsült töltési idő</p>
                                <p className="font-orbitron text-3xl font-bold text-cyan-300">
                                    {formattedTime}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monthly Usage Results */}
                <div className="space-y-4">
                    <h3 className="text-lg font-orbitron text-cyan-300 border-b border-cyan-500/30 pb-2">Havi Költségek</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <ResultCard 
                            icon={<Icons.CarIcon className="w-6 h-6 text-cyan-400" />}
                            label="Havi EV áramköltség"
                            value={monthlyEvCost.toLocaleString('hu-HU', { maximumFractionDigits: 0 })}
                            unit="Ft"
                        />
                        
                        {isIceComparisonEnabled && (
                            <>
                                <ResultCard 
                                    icon={<Icons.FuelIcon className="w-6 h-6 text-cyan-400" />}
                                    label="Havi ICE üzemanyagköltség"
                                    value={monthlyIceCost.toLocaleString('hu-HU', { maximumFractionDigits: 0 })}
                                    unit="Ft"
                                />
                                
                                <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 p-5 rounded-xl border border-green-500/50 shadow-lg shadow-green-500/10">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="bg-green-500/20 p-3 rounded-full">
                                            <Icons.SavingsIcon className="w-8 h-8 text-green-400" />
                                        </div>
                                        <h4 className="text-xl font-orbitron font-bold text-green-400">Megtakarítás</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-400 text-xs uppercase tracking-wider">Havi</p>
                                            <p className="font-orbitron text-2xl font-bold text-white">
                                                {monthlySavings.toLocaleString('hu-HU', { maximumFractionDigits: 0 })} <span className="text-sm text-green-400">Ft</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs uppercase tracking-wider">Éves</p>
                                            <p className="font-orbitron text-2xl font-bold text-white">
                                                {yearlySavings.toLocaleString('hu-HU', { maximumFractionDigits: 0 })} <span className="text-sm text-green-400">Ft</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Solar Scenario Results */}
                {solarParams.isSolarEnabled && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-orbitron text-purple-300 border-b border-purple-500/30 pb-2">Napelemes szcenárió</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <SolarResultCard 
                                icon={<Icons.SunIcon className="w-6 h-6 text-purple-400" />}
                                label="Napi napelemes hozam"
                                value={solarResult.dailySolarKwh.toFixed(2)}
                                unit="kWh"
                            />
                            <SolarResultCard 
                                icon={<Icons.SunDimIcon className="w-6 h-6 text-purple-400" />}
                                label="Havi napelemes hozam"
                                value={solarResult.monthlySolarKwh.toFixed(1)}
                                unit="kWh"
                            />
                            <SolarResultCard 
                                icon={<Icons.EfficiencyIcon className="w-6 h-6 text-purple-400" />}
                                label="Önfogyasztási arány"
                                value={solarResult.selfConsumptionRate.toFixed(1)}
                                unit="%"
                            />

                            {solarParams.gridFeedInEnabled && solarResult.excessKwh > 0 && (
                                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                                    <div className="flex items-center space-x-4 mb-3">
                                        <div className="bg-purple-500/10 p-3 rounded-full">
                                            <Icons.EnergyIcon className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Napi visszatáplált felesleg</p>
                                            <p className="font-orbitron text-xl font-bold text-white">
                                                {solarResult.excessKwh.toFixed(2)} <span className="text-sm text-purple-400">kWh/nap</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-purple-500/10 p-3 rounded-full">
                                            <Icons.CurrencyForintIcon className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Havi visszatáplálási bevétel</p>
                                            <p className="font-orbitron text-xl font-bold text-white">
                                                {solarResult.feedInRevenue.toLocaleString('hu-HU', { maximumFractionDigits: 0 })} <span className="text-sm text-purple-400">Ft</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Solar Savings Summary */}
                            <div className="bg-gradient-to-r from-purple-900/40 to-violet-900/40 p-5 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/10">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-purple-500/20 p-3 rounded-full">
                                        <Icons.SavingsIcon className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <h4 className="text-xl font-orbitron font-bold text-purple-400">Napelemes megtakarítás</h4>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Havi megtakarítás napelemmel</p>
                                    <p className="font-orbitron text-3xl font-bold text-white">
                                        {solarResult.monthlySavings.toLocaleString('hu-HU', { maximumFractionDigits: 0 })} <span className="text-lg text-purple-400">Ft</span>
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Hálózati áramköltség ({monthlyEvCost.toLocaleString('hu-HU', { maximumFractionDigits: 0 })} Ft) vs. napelemes költség
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultDisplay;
