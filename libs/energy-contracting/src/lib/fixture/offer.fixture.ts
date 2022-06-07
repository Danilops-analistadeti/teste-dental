import { Offer } from '../interfaces/offer.interface';

export const offerFixture: Partial<Offer> = {
  price: 1.32,
  paymentBusinessDay: 1,
  companyName: 'ESFERA ENERGIA CONSULTORIA E GEST\u00c3O DE ENERGIA LTDA. ',
  email: 'danilo.soares.ext@gmail.com.br',
  id: '5fb2ea8e50645d477677de56',
  energyVolumeAverage: '0.133',
  energyVolumeHour: '0.133',
  proposalExpiration: new Date('2020-11-16T18:10:25'),
  offererName: 'Pedro Henrique Candido Ferreira',
  retusd: 1.33,
  observation: 'Teste',
  createdAt: new Date(),
  revisionObservation: 'tst'
};
