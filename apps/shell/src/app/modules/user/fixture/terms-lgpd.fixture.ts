import { TermsLgpd } from "../interfaces/terms-lgpd.interface";

export const lgpdFixture: TermsLgpd = {
    active: true,
    contracts: [
        {
            contractName: "privacy-contract",
            timestamp: "2021-11-08T19:14:16+00:00",
            isSigned: true
        },
    ],
    email: "d5bcb578-516b-4969-812b-070bc73ea728Thayanne.santos@xpi.com.br",
    id: 293,
    isAdmin: false,
    person: {
        id: 293,
        cpf: "",
        name: "Thayanne",
        phone: ""
    }
}