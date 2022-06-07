import { Owner } from './owner.interface';

export interface Energy {
  ownerId: Owner[];
  quotationType: string;
  startDate?: string;
  endDate?: string;
  energyVolumeAverage: string;
  energyVolumeHour: string;
  energySource: string;
  subMarketRegion: string;
  retusd: number;
  priceType: string;
  fullReparation: boolean;
}
