export interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
  icon: JSX.Element;
}

export interface PhaseSelectorProps {
    selectedPhase: number;
    onPhaseChange: (phase: number) => void;
}

export interface SolarParams {
    isSolarEnabled: boolean;
    panelPowerKw: number;
    peakSunHours: number;
    solarCaptureRate: number;
    gridFeedInEnabled: boolean;
    gridFeedInPrice: number;
}

export interface SolarResultData {
    dailySolarKwh: number;
    monthlySolarKwh: number;
    selfConsumedKwh: number;
    selfConsumptionRate: number;
    excessKwh: number;
    feedInRevenue: number;
    monthlySavings: number;
}

export interface ResultDisplayProps {
    chargingPower: number;
    chargingTime: number;
    energyToCharge: number;
    chargingCost: number;
    monthlyEvCost: number;
    monthlyIceCost: number;
    monthlySavings: number;
    yearlySavings: number;
    isIceComparisonEnabled: boolean;
    solarParams: SolarParams;
    solarResult: SolarResultData;
}

export interface ChargingParams {
    phase: number;
    amperage: number;
    capacity: number;
    startSoc: number;
    targetSoc: number;
    efficiency: number;
    electricityPrice: number;
    evConsumption: number;
    monthlyMileage: number;
    isIceComparisonEnabled: boolean;
    iceConsumption: number;
    fuelPrice: number;
}

export interface CalculatorFormProps {
    params: ChargingParams;
    solarParams: SolarParams;
    onParamChange: <K extends keyof ChargingParams>(key: K, value: ChargingParams[K]) => void;
    onSolarParamChange: <K extends keyof SolarParams>(key: K, value: SolarParams[K]) => void;
}
