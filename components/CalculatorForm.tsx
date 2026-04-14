import React from 'react';
import type { CalculatorFormProps } from '../types';
import PhaseSelector from './PhaseSelector';
import SliderInput from './SliderInput';
import { RANGES } from '../constants';
import { Icons } from './Icons';

const CalculatorForm: React.FC<CalculatorFormProps> = ({ params, solarParams, onParamChange, onSolarParamChange }) => {
    return (
        <div className="space-y-8">
            {/* Charging Setup Section */}
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-orbitron font-bold text-cyan-400 mb-6">Töltési Beállítások</h2>
                <div className="space-y-6">
                    <PhaseSelector 
                        selectedPhase={params.phase}
                        onPhaseChange={(value) => onParamChange('phase', value)}
                    />
                    <SliderInput 
                        label="Áramerősség"
                        value={params.amperage}
                        min={RANGES.AMPERAGE.MIN}
                        max={RANGES.AMPERAGE.MAX}
                        step={RANGES.AMPERAGE.STEP}
                        unit="A"
                        onChange={(value) => onParamChange('amperage', value)}
                        icon={<Icons.BoltIcon className="w-6 h-6 text-cyan-400"/>}
                    />
                </div>
            </div>

            {/* Battery Setup Section */}
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-orbitron font-bold text-cyan-400 mb-6">Akkumulátor Beállítások</h2>
                <div className="space-y-6">
                    <SliderInput 
                        label="Akkumulátor kapacitás"
                        value={params.capacity}
                        min={RANGES.CAPACITY.MIN}
                        max={RANGES.CAPACITY.MAX}
                        step={RANGES.CAPACITY.STEP}
                        unit="kWh"
                        onChange={(value) => onParamChange('capacity', value)}
                        icon={<Icons.BatteryFullIcon className="w-6 h-6 text-cyan-400"/>}
                    />
                    <SliderInput 
                        label="Kezdeti töltöttség"
                        value={params.startSoc}
                        min={RANGES.SOC.MIN}
                        max={RANGES.SOC.MAX}
                        step={RANGES.SOC.STEP}
                        unit="%"
                        onChange={(value) => onParamChange('startSoc', value)}
                        icon={<Icons.BatteryChargingIcon className="w-6 h-6 text-cyan-400" />}
                    />
                     <SliderInput 
                        label="Cél töltöttség"
                        value={params.targetSoc}
                        min={RANGES.SOC.MIN}
                        max={RANGES.SOC.MAX}
                        step={RANGES.SOC.STEP}
                        unit="%"
                        onChange={(value) => onParamChange('targetSoc', value)}
                        icon={<Icons.BatteryTargetIcon className="w-6 h-6 text-cyan-400" />}
                    />
                     <SliderInput 
                        label="Töltési hatékonyság"
                        value={params.efficiency}
                        min={RANGES.EFFICIENCY.MIN}
                        max={RANGES.EFFICIENCY.MAX}
                        step={RANGES.EFFICIENCY.STEP}
                        unit="%"
                        onChange={(value) => onParamChange('efficiency', value)}
                        icon={<Icons.EfficiencyIcon className="w-6 h-6 text-cyan-400" />}
                    />
                </div>
            </div>
             {/* Cost Setup Section */}
             <div className="p-6 bg-gray-900 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-orbitron font-bold text-cyan-400 mb-6">Költség Beállítások</h2>
                <div className="space-y-6">
                    <SliderInput 
                        label="Áram ára"
                        value={params.electricityPrice}
                        min={RANGES.ELECTRICITY_PRICE.MIN}
                        max={RANGES.ELECTRICITY_PRICE.MAX}
                        step={RANGES.ELECTRICITY_PRICE.STEP}
                        unit="Ft/kWh"
                        onChange={(value) => onParamChange('electricityPrice', value)}
                        icon={<Icons.CurrencyForintIcon className="w-6 h-6 text-cyan-400"/>}
                    />
                </div>
            </div>

            {/* Usage Section */}
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-orbitron font-bold text-cyan-400 mb-6">Használati Adatok</h2>
                <div className="space-y-6">
                    <SliderInput 
                        label="EV Fogyasztás"
                        value={params.evConsumption}
                        min={RANGES.EV_CONSUMPTION.MIN}
                        max={RANGES.EV_CONSUMPTION.MAX}
                        step={RANGES.EV_CONSUMPTION.STEP}
                        unit="kWh/100km"
                        onChange={(value) => onParamChange('evConsumption', value)}
                        icon={<Icons.CarIcon className="w-6 h-6 text-cyan-400"/>}
                    />
                    <SliderInput 
                        label="Havi futásteljesítmény"
                        value={params.monthlyMileage}
                        min={RANGES.MONTHLY_MILEAGE.MIN}
                        max={RANGES.MONTHLY_MILEAGE.MAX}
                        step={RANGES.MONTHLY_MILEAGE.STEP}
                        unit="km"
                        onChange={(value) => onParamChange('monthlyMileage', value)}
                        icon={<Icons.DistanceIcon className="w-6 h-6 text-cyan-400"/>}
                    />
                </div>
            </div>

            {/* ICE Comparison Section */}
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-orbitron font-bold text-cyan-400">Összehasonlítás</h2>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={params.isIceComparisonEnabled}
                            onChange={(e) => onParamChange('isIceComparisonEnabled', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                </div>
                
                {params.isIceComparisonEnabled && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                        <SliderInput 
                            label="ICE Fogyasztás"
                            value={params.iceConsumption}
                            min={RANGES.ICE_CONSUMPTION.MIN}
                            max={RANGES.ICE_CONSUMPTION.MAX}
                            step={RANGES.ICE_CONSUMPTION.STEP}
                            unit="L/100km"
                            onChange={(value) => onParamChange('iceConsumption', value)}
                            icon={<Icons.FuelIcon className="w-6 h-6 text-cyan-400"/>}
                        />
                        <SliderInput 
                            label="Üzemanyag ára"
                            value={params.fuelPrice}
                            min={RANGES.FUEL_PRICE.MIN}
                            max={RANGES.FUEL_PRICE.MAX}
                            step={RANGES.FUEL_PRICE.STEP}
                            unit="Ft/L"
                            onChange={(value) => onParamChange('fuelPrice', value)}
                            icon={<Icons.CurrencyForintIcon className="w-6 h-6 text-cyan-400"/>}
                        />
                    </div>
                )}
            </div>

            {/* Solar Panel Section */}
            <div className="p-6 bg-gray-900 rounded-xl border border-purple-500/40">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-orbitron font-bold text-purple-400">Napelemes szcenárió</h2>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={solarParams.isSolarEnabled}
                            onChange={(e) => onSolarParamChange('isSolarEnabled', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                </div>

                {solarParams.isSolarEnabled && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                        <SliderInput 
                            label="Panel teljesítmény"
                            value={solarParams.panelPowerKw}
                            min={RANGES.PANEL_POWER_KW.MIN}
                            max={RANGES.PANEL_POWER_KW.MAX}
                            step={RANGES.PANEL_POWER_KW.STEP}
                            unit="kW"
                            onChange={(value) => onSolarParamChange('panelPowerKw', value)}
                            icon={<Icons.SunIcon className="w-6 h-6 text-purple-400"/>}
                        />
                        <SliderInput 
                            label="Csúcs napsütéses óra/nap"
                            value={solarParams.peakSunHours}
                            min={RANGES.PEAK_SUN_HOURS.MIN}
                            max={RANGES.PEAK_SUN_HOURS.MAX}
                            step={RANGES.PEAK_SUN_HOURS.STEP}
                            unit="óra"
                            onChange={(value) => onSolarParamChange('peakSunHours', value)}
                            icon={<Icons.SunDimIcon className="w-6 h-6 text-purple-400"/>}
                        />
                        <SliderInput 
                            label="Napelemes elfogási arány"
                            value={solarParams.solarCaptureRate}
                            min={RANGES.SOLAR_CAPTURE_RATE.MIN}
                            max={RANGES.SOLAR_CAPTURE_RATE.MAX}
                            step={RANGES.SOLAR_CAPTURE_RATE.STEP}
                            unit="%"
                            onChange={(value) => onSolarParamChange('solarCaptureRate', value)}
                            icon={<Icons.EfficiencyIcon className="w-6 h-6 text-purple-400"/>}
                        />

                        {/* Grid Feed-in Toggle */}
                        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold text-gray-300 flex items-center gap-2">
                                    <Icons.EnergyIcon className="w-6 h-6 text-purple-400" />
                                    Visszatáplálás hálózatba
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer"
                                        checked={solarParams.gridFeedInEnabled}
                                        onChange={(e) => onSolarParamChange('gridFeedInEnabled', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                                </label>
                            </div>
                        </div>

                        {solarParams.gridFeedInEnabled && (
                            <SliderInput 
                                label="Visszatáplálási díj"
                                value={solarParams.gridFeedInPrice}
                                min={RANGES.GRID_FEED_IN_PRICE.MIN}
                                max={RANGES.GRID_FEED_IN_PRICE.MAX}
                                step={RANGES.GRID_FEED_IN_PRICE.STEP}
                                unit="Ft/kWh"
                                onChange={(value) => onSolarParamChange('gridFeedInPrice', value)}
                                icon={<Icons.CurrencyForintIcon className="w-6 h-6 text-purple-400"/>}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalculatorForm;
