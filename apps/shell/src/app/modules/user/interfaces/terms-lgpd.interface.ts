import { Contracts } from "./contracts.interface";
import { Person } from "./person.interface";

export interface TermsLgpd {
    active: boolean;
    contracts: Contracts[];
    email: string;
    id: number;
    isAdmin: boolean;
    person: Person;
}
