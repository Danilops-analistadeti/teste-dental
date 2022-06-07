import { CustomModalAlert } from '@energy-contracting';

export const CUSTOM_ALERT_PROPOSAL_SUBMISSION: CustomModalAlert = {
  id: 'proposal-submission-alert',
  title: 'Alerta/recomendação',
  icon: 'report_problem',
  htmlBody: `<h5>Cotações com pouco prazo para receber ofertas podem não serem atendidas ou reduzir a adesão dos ofertantes.
  <br/> <br/>
  Sugerimos que o prazo mínimo para receber ofertas seja aproximadamente 30 minutos.</h5>`
};
