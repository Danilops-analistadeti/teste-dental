import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Agents, AgentsService } from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { PreRegistrationService } from '../../services/pre-registration.service';
import { INIT_LOADING_DEFAULT } from './constants/init-loading-default.constant';

@Component({
  selector: 'ec-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Output() successRegistration: EventEmitter<boolean> = new EventEmitter<boolean>();

  registrationForm!: FormGroup;
  agentsData: Agents[] | undefined;

  loading = INIT_LOADING_DEFAULT;

  constructor(
    private formBuilder: FormBuilder,
    private preRegistrationService: PreRegistrationService,
    private notificationsService: NotificationsService,
    private agentsService: AgentsService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registrationForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      phone: new FormControl(null, Validators.required),
      agents: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    this.loading.submit = true;
    this.preRegistrationService
      .preRegistration(this.registrationForm.value)
      .subscribe({
        next: () => {
          this.notificationsService.success('Cadastro enviado com sucesso!');
          this.successRegistration.emit();
        },
        error: ({ error }) => this.notificationsService.error(error?.message)
      })
      .add(() => (this.loading.submit = false));
  }

  changeAgents(value?: string): void {
    if (!value) {
      this.agentsData = [];
      return;
    }

    this.loading.getAgents = true;

    this.agentsService
      .getAgentsCCEE(value)
      .subscribe({
        next: (response) => (this.agentsData = response),
        error: ({ error }) => this.notificationsService.error(error?.message)
      })
      .add(() => (this.loading.getAgents = false));
  }
}
