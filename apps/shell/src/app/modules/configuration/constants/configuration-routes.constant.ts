import {Navigation} from '../interfaces/navigation.interface';

export const CONFIGURATION_ROUTES: Navigation[] = [
  {
    name: 'Ofertantes',
    icon: 'ec_renewable-energy',
    url: 'offerers'
  },
  {
    name: 'Empresas',
    icon: 'business',
    url: 'company'
  },
  {
    name: 'Dados Gerais',
    icon: 'assignment',
    url: 'general-data'
  },
  {
    name: 'Dados de faturamento',
    icon: 'request_quote',
    url: 'billing-info'
  },
  {
    name: 'Usuários',
    icon: 'group',
    url: 'user'
  }
];
