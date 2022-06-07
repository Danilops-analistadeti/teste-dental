import { TermsLgpd } from '../interfaces/terms-lgpd.interface';
import { User } from '../interfaces/user.interface';

export const usersFixture: User[] = [
  {
    email: "pedro.candido.ext@esferaenergia.com.br",
    active: true,
    person: {
      name: "Paulo Henrique Vieira Nascimento",
      phone: "(035) 99988-6699",
      cpf: "94428944047"
    },
    id: "ID"
  },
  {
    email: "paulo@esferaenergia.com.br",
    active: true,
    person: {
      name: "Henrique Nascimento",
      phone: "(035) 99988-6699",
      cpf: "94428944047"
    },
    id: "ID"
  }
];
