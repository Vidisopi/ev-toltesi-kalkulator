import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import CalculatorForm from './components/CalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import { DEFAULT_VALUES, VOLTAGE } from './constants';
import type { ChargingParams, SolarParams, SolarResultData } from './types';

const loadBool = (key: string, fallback: boolean): boolean => {
    try {
        const stored = localStorage.getItem(key);
        if (stored !== null) return stored === 'true';
    } catch {}
    return fallback;
};

const App: React.FC = () => {
    const [params, setParams] = useState<ChargingParams>({
        phase: DEFAULT_VALUES.PHASE,
        amperage: DEFAULT_VALUES.AMPERAGE,
        capacity: DEFAULT_VALUES.CAPACITY,
        startSoc: DEFAULT_VALUES.START_SOC,
        targetSoc: DEFAULT_VALUES.TARGET_SOC,
        efficiency: DEFAULT_VALUES.EFFICIENCY,
        electricityPrice: DEFAULT_VALUES.ELECTRICITY_PRICE,
        evConsumption: DEFAULT_VALUES.EV_CONSUMPTION,
        monthlyMileage: DEFAULT_VALUES.MONTHLY_MILEAGE,
        isIceComparisonEnabled: DEFAULT_VALUES.IS_ICE_COMPARISON_ENABLED,
        iceConsumption: DEFAULT_VALUES.ICE_CONSUMPTION,
        fuelPrice: DEFAULT_VALUES.FUEL_PRICE,
    });

    const [solarParams, setSolarParams] = useState<SolarParams>({
        isSolarEnabled: loadBool('solarEnabled', DEFAULT_VALUES.IS_SOLAR_ENABLED),
        panelPowerKw: DEFAULT_VALUES.PANEL_POWER_KW,
        peakSunHours: DEFAULT_VALUES.PEAK_SUN_HOURS,
        solarCaptureRate: DEFAULT_VALUES.SOLAR_CAPTURE_RATE,
        gridFeedInEnabled: loadBool('solarGridFeedIn', DEFAULT_VALUES.GRID_FEED_IN_ENABLED),
        gridFeedInPrice: DEFAULT_VALUES.GRID_FEED_IN_PRICE,
    });

    const [chargingPower, setChargingPower] = useState(0);
    const [chargingTime, setChargingTime] = useState(0);
    const [energyToCharge, setEnergyToCharge] = useState(0);
    const [chargingCost, setChargingCost] = useState(0);
    const [monthlyEvCost, setMonthlyEvCost] = useState(0);
    const [monthlyIceCost, setMonthlyIceCost] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);
    const [yearlySavings, setYearlySavings] = useState(0);
    const [solarResult, setSolarResult] = useState<SolarResultData>({
        dailySolarKwh: 0,
        monthlySolarKwh: 0,
        selfConsumedKwh: 0,
        selfConsumptionRate: 0,
        excessKwh: 0,
        feedInRevenue: 0,
        monthlySavings: 0,
    });

    const handleParamChange = useCallback(<K extends keyof ChargingParams,>(key: K, value: ChargingParams[K]) => {
        setParams(prev => {
            const newParams = { ...prev, [key]: value };
            if (key === 'startSoc' && newParams.startSoc > newParams.targetSoc) {
                newParams.targetSoc = newParams.startSoc;
            }
            if (key === 'targetSoc' && newParams.targetSoc < newParams.startSoc) {
                newParams.startSoc = newParams.targetSoc;
            }
            return newParams;
        });
    }, []);

    const handleSolarParamChange = useCallback(<K extends keyof SolarParams,>(key: K, value: SolarParams[K]) => {
        setSolarParams(prev => {
            const newParams = { ...prev, [key]: value };
            // Persist toggles
            if (key === 'isSolarEnabled') {
                try { localStorage.setItem('solarEnabled', String(value)); } catch {}
            }
            if (key === 'gridFeedInEnabled') {
                try { localStorage.setItem('solarGridFeedIn', String(value)); } catch {}
            }
            return newParams;
        });
    }, []);

    useEffect(() => {
        // Charging session calculations
        const powerKw = (VOLTAGE * params.amperage * params.phase) / 1000;
        const energyNeededKwh = params.capacity * ((params.targetSoc - params.startSoc) / 100);
        
        let sessionCost = 0;
        let timeHours = 0;

        if (energyNeededKwh > 0) {
            const totalEnergyFromGridKwh = energyNeededKwh / (params.efficiency / 100);
            timeHours = powerKw > 0 ? totalEnergyFromGridKwh / powerKw : 0;
            sessionCost = totalEnergyFromGridKwh * params.electricityPrice;
        }

        setChargingPower(powerKw);
        setChargingTime(timeHours);
        setEnergyToCharge(energyNeededKwh > 0 ? energyNeededKwh : 0);
        setChargingCost(sessionCost);

        // Monthly calculations
        const monthlyEnergyKwh = (params.monthlyMileage / 100) * params.evConsumption;
        const monthlyGridEnergyKwh = monthlyEnergyKwh / (params.efficiency / 100);
        const mEvCost = monthlyGridEnergyKwh * params.electricityPrice;
        setMonthlyEvCost(mEvCost);

        if (params.isIceComparisonEnabled) {
            const monthlyFuelLiters = (params.monthlyMileage / 100) * params.iceConsumption;
            const mIceCost = monthlyFuelLiters * params.fuelPrice;
            setMonthlyIceCost(mIceCost);
            
            const mSavings = mIceCost - mEvCost;
            setMonthlySavings(mSavings);
            setYearlySavings(mSavings * 12);
        } else {
            setMonthlyIceCost(0);
            setMonthlySavings(0);
            setYearlySavings(0);
        }

        // Solar calculations
        if (solarParams.isSolarEnabled) {
            const dailySolarKwh = solarParams.panelPowerKw * solarParams.peakSunHours * (solarParams.solarCaptureRate / 100);
            const monthlySolarKwh = dailySolarKwh * 30;

            // Daily energy needed for EV
            const dailyEnergyNeededKwh = (params.monthlyMileage / 30 / 100) * params.evConsumption / (params.efficiency / 100);
            const dailyFromGridEnergyKwh = dailyEnergyNeededKwh;

            let selfConsumedKwh = 0;
            let excessKwh = 0;
            let feedInRevenue = 0;

            if (dailySolarKwh >= dailyFromGridEnergyKwh) {
                selfConsumedKwh = dailyFromGridEnergyKwh;
                excessKwh = dailySolarKwh - dailyFromGridEnergyKwh;
                if (solarParams.gridFeedInEnabled) {
                    feedInRevenue = excessKwh * solarParams.gridFeedInPrice * 30;
                }
            } else {
                selfConsumedKwh = dailySolarKwh;
                excessKwh = 0;
                feedInRevenue = 0;
            }

            const selfConsumptionRate = dailySolarKwh > 0 ? (selfConsumedKwh / dailySolarKwh) * 100 : 0;

            // Savings: grid cost without solar - (grid cost with solar self-consumption + feed-in revenue)
            // Without solar: monthlyEvCost (already calculated)
            // With solar: the grid cost for energy NOT covered by solar
            const gridCostWithSolar = (dailyFromGridEnergyKwh - selfConsumedKwh) * 30 * params.electricityPrice;
            const solarMonthlySavings = mEvCost - gridCostWithSolar + feedInRevenue;

            setSolarResult({
                dailySolarKwh,
                monthlySolarKwh,
                selfConsumedKwh,
                selfConsumptionRate,
                excessKwh,
                feedInRevenue,
                monthlySavings: solarMonthlySavings,
            });
        } else {
            setSolarResult({
                dailySolarKwh: 0,
                monthlySolarKwh: 0,
                selfConsumedKwh: 0,
                selfConsumptionRate: 0,
                excessKwh: 0,
                feedInRevenue: 0,
                monthlySavings: 0,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, solarParams]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <Header />
            <main className="w-full max-w-7xl mt-8 p-4 sm:p-6 bg-gray-800 bg-opacity-50 rounded-2xl shadow-2xl border border-cyan-500/20 backdrop-blur-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CalculatorForm 
                        params={params} 
                        solarParams={solarParams}
                        onParamChange={handleParamChange} 
                        onSolarParamChange={handleSolarParamChange}
                    />
                    <ResultDisplay 
                        chargingPower={chargingPower} 
                        chargingTime={chargingTime}
                        energyToCharge={energyToCharge}
                        chargingCost={chargingCost}
                        monthlyEvCost={monthlyEvCost}
                        monthlyIceCost={monthlyIceCost}
                        monthlySavings={monthlySavings}
                        yearlySavings={yearlySavings}
                        isIceComparisonEnabled={params.isIceComparisonEnabled}
                        solarParams={solarParams}
                        solarResult={solarResult}
                    />
                </div>
            </main>
             <footer className="text-center text-gray-500 mt-8 text-sm">
                <p>&copy; {new Date().getFullYear()} EV Töltési Idő Kalkulátor. Minden jog fenntartva.</p>
            </footer>
        </div>
    );
};

export default App;
