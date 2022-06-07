import { Application } from './application.interface';
import { Company } from './company.interface';
import { Feature } from './feature.interface';

export interface Role {
    token: string;
    company: Company;
    features: Feature[];
    name: string;
    application: Application;
    id: string;
}
