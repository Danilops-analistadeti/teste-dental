import { TableColumn } from '@energy-contracting';

export const offersReceivedColumns: TableColumn[] = [
  { displayCol: 'observation', headerCol: '', isObservation: true },
  { displayCol: 'offererName', headerCol: 'Ofertante', isNameCompany: true },
  { displayCol: 'status', headerCol: 'Status', isStatus: true },
  { displayCol: 'createdAt', headerCol: 'Hora da oferta', isCreateAt: true },
  { displayCol: 'price', headerCol: 'Preço ', subHeader: '(R$ /MWh)', isPriceWithVolume: true },
  { displayCol: 'energyVolumeAverage', headerCol: 'Volume', subHeader: '(MWméd)', isVolume: true },
  { displayCol: 'retusd', headerCol: 'Retusd', subHeader: '(R$ /MWh)', isPriceWithVolume: true },
  { displayCol: 'formattedPaymentBusinessDay', headerCol: 'Data de pagamento', isDate: true },
  { displayCol: 'proposalExpiration', headerCol: 'Validade', isDateWithHours: true },
  { displayCol: 'Ver alterações', headerCol: 'Customização', isCustomization: true, condicionalCol: 'changed' },
  { displayCol: 'isAction', headerCol: 'Negociar oferta', isDateWithHours: true, isAction: true }
];
