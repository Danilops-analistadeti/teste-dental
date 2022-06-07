import { CustomModalAlert } from '@energy-contracting';

export const CUSTOM_ALERT_MWH: CustomModalAlert = {
  id: 'mhw-alert',
  title: 'Alerta/recomendação',
  icon: 'report_problem',
  htmlBody: `<h5>Cotações com altos volumes <b>(acima de 10 MW médios)</b>
  são exposições grandes para uma única contraparte e podem movimentar os preços de mercado!
  <br/> <br/>
  Sugerimos que voce divida o volume em tranches menores e em cotações distintas, assim você reduz os riscos envolvidos.</h5>`
};
