import { EnergySource } from '../enums/energy-source.enum';

export const isRetusd = (energySource: string): boolean => energySource !== EnergySource.CONVENTIONAL &&
  energySource !== EnergySource.SPECIAL_CONVENTIONAL;

