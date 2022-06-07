import { CustomModalAlert } from '@energy-contracting';

export const ALERT_MAX_PROPOSAL: CustomModalAlert = {
  id: 'alert-max-proposal',
  title: 'Alerta/recomendação',
  icon: 'report_problem',
  htmlBody: `<h5>Você está solicitando uma cotação com prazo para receber as ofertas maior do que 2h!
  <br/> <br/>
  Durante esse prazo não será possível definir ofertas vencedoras. Caso o processo precise ser finalizado com celeridade sugerimos que utilize o prazo padrão de 35 minutos.</h5>`
};
