import { CustomModalAlert } from '@energy-contracting';

export const CUSTOM_ALERT_PROPOSAL_HOUR: CustomModalAlert = {
  id: 'proposal-hour-alert',
  title: 'Alerta/recomendação',
  icon: 'report_problem',
  htmlBody: `<h5>Você está realizando uma cotação em um horário que costuma ter baixa adesão de fornecedores e pode não ser atendida.
  <br/> <br/>
  Sugerimos que realize as cotações entre 8:30 - 12:00 no período da manhã e 14:00 - 17:30 no periodo da tarde.</h5>`
};
