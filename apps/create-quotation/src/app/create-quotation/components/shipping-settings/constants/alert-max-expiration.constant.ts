import { CustomModalAlert } from '@energy-contracting';

export const ALERT_MAX_EXPIRATION: CustomModalAlert = {
  id: 'alert-max-expiration',
  title: 'Alerta/recomendação',
  icon: 'report_problem',
  htmlBody: `<h5>Você está solicitando que os fornecedores mantenham a validade dos preços por mais de 1h.
  <br/> <br/>
  Esse prazo pode não ser atendido, portanto fique atento na validade das ofertas recebidas para não perdê-las.</h5>`
};
