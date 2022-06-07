import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  Agents,
  AgentsService,
  Company,
  CompanyDetailComponent,
  companyDetailModal,
  CompanyGroup,
  CompanyGroups,
  CompanyGroupService,
  convertStringToDate,
  CreateCompanyGroupComponent,
  createCompanyGroupModal,
  createLocaleDateToUTC,
  CreateQuotation,
  CreateQuotationState,
  CustomModalAlertComponent,
  FORMAT_DATETIME,
  parseStringToDate,
  QuotationData,
  ShippingSettings
} from '@energy-contracting';
import { EsferaCardColumn, EsferaCardItemChanged, NotificationsService } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { distinctUntilChanged } from 'rxjs/operators';
import { longStepper } from '../utils/long-stepper.util';
import { ALERT_MAX_EXPIRATION } from './constants/alert-max-expiration.constant';
import { ALERT_MAX_PROPOSAL } from './constants/alert-max-proposal.constant';
import { companyCardColumns } from './constants/company-column.constant';
import { CUSTOM_ALERT_PROPOSAL_HOUR } from './constants/custom-alert-proposal-hour.constant';
import { CUSTOM_ALERT_PROPOSAL_SUBMISSION } from './constants/custom-alert-proposal-submission.constant';
import { ERROR_SEARCH_GROUPS } from './constants/error-search-groups.constant';
import { SHIPPING_SETTINGS_LOADING } from './constants/shipping-settings-loading';

@Component({
  selector: 'ec-shipping-settings',
  templateUrl: './shipping-settings.component.html',
  styleUrls: ['./shipping-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingSettingsComponent implements OnInit, AfterViewInit {
  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();

  companyGroups: CompanyGroups[];
  companyColumns: EsferaCardColumn[] = companyCardColumns;
  shippingSettingsForm: FormGroup;
  minDate: Date = createLocaleDateToUTC();
  loading = SHIPPING_SETTINGS_LOADING;

  constructor(
    private companyGroupService: CompanyGroupService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef,
    private store: Store,
    private agentsService: AgentsService,
    private companyService: CompanyGroupService,
    private notificationsService: NotificationsService
  ) {}

  ngAfterViewInit(): void {
    this.onCreateFormChange();
    this.valueChangesProposalSubmission();
    this.valueChangesExpiration();
    this.setInitTimeProposal();
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.shippingSettingsForm.disable();
    } else {
      this.shippingSettingsForm.enable();
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCompanyGroups();
    this.initShippingSettingsValues();
    this.parseStateQuotationToShippingSettings();
  }

  parseStateQuotationToShippingSettings(): void {
    const { shippingSettings } = this.store.selectSnapshot(CreateQuotationState);

    if (shippingSettings) {
      this.shippingSettingsForm.patchValue(shippingSettings);
    }
  }

  setInitTimeProposal(): void {
    const { energy } = this.store.selectSnapshot(CreateQuotationState);

    const noStepperLong = longStepper(convertStringToDate(energy.startDate), convertStringToDate(energy.endDate));

    if (noStepperLong) {
      const minDateProposal = new Date(createLocaleDateToUTC().setMinutes(createLocaleDateToUTC().getMinutes() + 35));
      const minDateExpiration = new Date(createLocaleDateToUTC().setMinutes(createLocaleDateToUTC().getMinutes() + 65));

      this.shippingSettingsForm.get('proposalSubmission').setValue(minDateProposal);

      this.shippingSettingsForm.get('expiration').setValue(minDateExpiration);
    }
  }

  getAgentsCount(): void {
    this.agentsService.getAgentsCount().subscribe({
      next: (response) => {
        const allCompany: CompanyGroups = {
          name: 'Cotar com todos os ofertantes da plataforma',
          countCompanies: +response
        };

        this.companyGroups.unshift(allCompany);
        this.changeDetectionRef.detectChanges();
      }
    });
  }

  initShippingSettingsValues(): void {
    const createQuotation: CreateQuotation = this.store.selectSnapshot(CreateQuotationState);

    if (createQuotation?.shippingSettings) {
      this.shippingSettingsForm.get('companyGroups').setValue(createQuotation.shippingSettings?.companyGroups, {
        emitEvent: false
      });
    }
  }

  buildForm(): void {
    this.shippingSettingsForm = this.formBuilder.group({
      proposalSubmission: new FormControl(),
      expiration: new FormControl(),
      auxProposalSubmission: new FormControl(),
      auxExpiration: new FormControl(),
      companyGroups: new FormControl([], Validators.required)
    });
  }

  onCreateFormChange(): void {
    this.shippingSettingsForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (shippingSettings: ShippingSettings) => {
        this.validationDates(shippingSettings);
        this.store.dispatch(new QuotationData({ shippingSettings }));
      }
    });
  }

  validationDates({ expiration, proposalSubmission }: ShippingSettings): void {
    if (expiration) {
      this.formatInputDatetime('auxExpiration', 'expiration', this.getPeriod('expiration'));
    }

    if (proposalSubmission) {
      this.formatInputDatetime('auxProposalSubmission', 'proposalSubmission', this.getPeriod('proposalSubmission'));
    }
  }

  formatInputDatetime(key: string, getKey: string, period: string): void {
    const change = this.shippingSettingsForm.get(getKey).value.toLocaleString('pt-BR', FORMAT_DATETIME);
    this.shippingSettingsForm.patchValue({ [key]: `${change} ${period}` }, { emitEvent: false });
  }

  getPeriod(objKey: string): string {
    return Number(moment(this.shippingSettingsForm.get(objKey).value).format('HH')) > 12 ? 'PM' : 'AM';
  }

  getCompanyGroups(): void {
    this.loading.getCompanyGroups = true;
    this.companyGroupService
      .getCompanyGroups()
      .subscribe({
        next: (response: CompanyGroups[]) => {
          this.companyGroups = response;
          this.getAgentsCount();
        }
      })
      .add(() => {
        this.loading.getCompanyGroups = false;
        this.changeDetectionRef.detectChanges();
      });
  }

  getCompanyOrAgents(item: CompanyGroups): void {
    this.loading.isLoadingCompanyDetail = true;
    if (item.id) {
      this.getGroups(item);
    } else {
      this.getAgents();
    }
  }

  getGroups({ id }: CompanyGroups): void {
    this.companyService
      .getGroupById(id)
      .subscribe({
        next: (response: CompanyGroup) => this.openCompanyDetail(response),
        error: () => this.notificationsService.error(ERROR_SEARCH_GROUPS)
      })
      .add(() => {
        this.loading.isLoadingCompanyDetail = false;
        this.changeDetectionRef.detectChanges();
      });
  }

  getAgents(): void {
    this.agentsService
      .getAgents()
      .subscribe({
        next: (response: Agents[]) => this.successGetAgents(response as Company[]),
        error: () => this.notificationsService.error(ERROR_SEARCH_GROUPS)
      })
      .add(() => {
        this.loading.isLoadingCompanyDetail = false;
        this.changeDetectionRef.detectChanges();
      });
  }

  successGetAgents(response: Company[]): void {
    const editDialog = this.dialog.open(CompanyDetailComponent, companyDetailModal);
    editDialog.componentInstance.companies = response;
    editDialog.componentInstance.companyGroup = {
      name: 'Cotar com todos os ofertantes da plataforma',
      companies: response
    };
  }

  openCompanyDetail(item: CompanyGroup): void {
    const editDialog = this.dialog.open(CompanyDetailComponent, companyDetailModal);
    editDialog.componentInstance.companyGroup = item;
    editDialog.componentInstance.companies = item.companies;
  }

  openCreateCompanyGroup(): void {
    this.dialog.open(CreateCompanyGroupComponent, createCompanyGroupModal);
  }

  selectGroups({ checked, item }: EsferaCardItemChanged): void {
    const companyGroupsControl = this.shippingSettingsForm.get('companyGroups');
    let companyGroups = companyGroupsControl.value;
    if (checked) {
      companyGroups.push(item);
    } else {
      companyGroups = companyGroups.filter((e: CompanyGroups) => e !== item);
    }
    companyGroupsControl.setValue(companyGroups);
  }

  valueChangesProposalSubmission(): void {
    this.shippingSettingsForm.get('proposalSubmission').valueChanges.subscribe({
      next: (value) => this.validProposalSubmissionAlert(value)
    });
  }

  valueChangesExpiration(): void {
    this.shippingSettingsForm.get('expiration').valueChanges.subscribe({
      next: (value) => this.validExpirationAlert(value)
    });
  }

  validExpirationAlert(value: string | Date): void {
    const valueDate: Date = (value as Date)?.getTime() ? (value as Date) : parseStringToDate(value as string);

    const customAlertStorage = localStorage.getItem(ALERT_MAX_EXPIRATION.id);

    const minutes = moment(valueDate).diff(this.shippingSettingsForm.get('proposalSubmission').value, 'minutes');

    if (minutes > 60 && !customAlertStorage && !this.dialog.openDialogs.length) {
      this.dialog.open(CustomModalAlertComponent, {
        width: '350px',
        data: ALERT_MAX_EXPIRATION
      });
    }
  }

  validProposalHour(value: Date): void {
    const customAlertProposalHour = localStorage.getItem(CUSTOM_ALERT_PROPOSAL_HOUR.id);

    const time = moment(value, 'hh:mm:ss');
    const eight = moment('8:30:00', 'hh:mm:ss');
    const midday = moment('12:00:00', 'hh:mm:ss');
    const fourteen = moment('14:00:00', 'hh:mm:ss');
    const seventeen = moment('17:30:00', 'hh:mm:ss');

    if (
      !time.isBetween(eight, midday) &&
      !time.isBetween(fourteen, seventeen) &&
      !customAlertProposalHour &&
      !this.dialog.openDialogs.length
    ) {
      this.dialog.open(CustomModalAlertComponent, {
        width: '350px',
        data: CUSTOM_ALERT_PROPOSAL_HOUR
      });
    }
  }

  validProposalSubmissionAlert(value: string | Date): void {
    const valueDate: Date = (value as Date)?.getTime() ? (value as Date) : parseStringToDate(value as string);

    this.validProposalHour(valueDate);

    this.validProposalMinutes(valueDate);
  }

  validProposalMinutes(value: Date): void {
    const customAlertStorage = localStorage.getItem(CUSTOM_ALERT_PROPOSAL_SUBMISSION.id);

    const customAlertMaxProposal = localStorage.getItem(ALERT_MAX_PROPOSAL.id);
    const createLocaleDate = createLocaleDateToUTC();

    const minutes = moment(value).diff(createLocaleDate, 'minutes');

    if (minutes < 30 && !customAlertStorage && !this.dialog.openDialogs.length) {
      this.dialog.open(CustomModalAlertComponent, {
        width: '350px',
        data: CUSTOM_ALERT_PROPOSAL_SUBMISSION
      });
    } else if (minutes >= 120 && !customAlertMaxProposal && !this.dialog.openDialogs.length) {
      this.dialog.open(CustomModalAlertComponent, {
        width: '350px',
        data: ALERT_MAX_PROPOSAL
      });
    }
  }
}
