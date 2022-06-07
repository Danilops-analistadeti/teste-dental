import { CustomModalAlert } from '@energy-contracting';

export const CUSTOM_ALERT_PAYMENT_DAY: CustomModalAlert = {
  id: 'payment-day-alert',
  title: 'Alerta/recomendação',
  icon: 'report_problem',
  htmlBody: `<h5>Cotações de curto prazo com data de pagamento fora do padrão podem gerar uma baixa adesão dos ofertantes ou não serem atendidas.
  <br/> <br/>
  Sugerimos que a data de pagamento solicitada seja o 6º ou 7º dia útil do mês seguinte.</h5>`
};
