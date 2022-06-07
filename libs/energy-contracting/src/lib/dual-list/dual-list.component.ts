import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { Agents } from '../interfaces/agents.interface';
import { AgentsService } from '../services/agents.service';

@Component({
  selector: 'ec-dual-list',
  templateUrl: './dual-list.component.html',
  styleUrls: ['./dual-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DualListComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DualListComponent implements OnInit, ControlValueAccessor {
  @Output() searched: EventEmitter<string> = new EventEmitter();
  @Input() name!: string;
  @Input() debounceValue = 500;
  @Input() minSearchLength = 3;
  @Input() isLoading!: boolean;
  @Input() selectsTwo: any[] = [];
  @Input() labelListOne = 'Pesquisar fornecedor disponível';
  @Input() labelListTwo = 'Pesquisar fornecedor adicionado';
  value: any[] = [];
  form!: FormGroup;
  filteredOptions!: any[];
  filteredOptionsTwo!: any[];
  currentPage = 1;
  itemsPerPage = 500;

  constructor(
    private formBuilder: FormBuilder,
    private agentsService: AgentsService,
    private changeDetection: ChangeDetectorRef
  ) {}

  onChange = (selected: Array<Agents>): void => {};
  onTouched = (): void => {};

  writeValue(obj: Array<Agents>): void {
    this.value = obj;
  }

  registerOnChange(fn: (selected: Array<Agents>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  filter(value: string, items: Array<Agents>): Agents[] {
    const filterValue = value.toLowerCase();
    return items?.filter((option) => option[this.name].toLowerCase().indexOf(filterValue) === 0);
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      inputOne: new FormControl(null),
      inputTwo: new FormControl(null)
    });

    this.inputOneValueChanges();
    this.inputTwoValueChanges();
  }

  inputOneValueChanges(): void {
    this.form
      .get('inputOne')
      .valueChanges.pipe(startWith(''), debounceTime(this.debounceValue), distinctUntilChanged())
      .subscribe({
        next: (value) => this.searchAgents(value)
      });
  }

  inputTwoValueChanges(): void {
    this.form
      .get('inputTwo')
      .valueChanges.pipe(startWith(''))
      .subscribe({
        next: (value) => (this.filteredOptionsTwo = this.filter(value, this.selectsTwo))
      });
  }

  searchAgents(term?: string): void {
    this.isLoading = true;
    this.changeDetection.detectChanges();
    this.agentsService
      .getAgents(this.currentPage, this.itemsPerPage, term)
      .subscribe({
        next: (agents) =>
          (this.filteredOptions = agents.filter((val) => !this.selectsTwo.find((item) => val.id === item.id)))
      })
      .add(() => {
        this.isLoading = false;
        this.changeDetection.detectChanges();
      });
  }

  moveAllSelected(): void {
    this.selectsTwo = [...this.filteredOptions, ...this.selectsTwo];
    this.filteredOptions = [];
    this.filteredOptionsTwo = this.selectsTwo;
    this.onChange(this.selectsTwo);
  }

  moveAllUnselected(): void {
    this.filteredOptions = [...this.filteredOptions, ...this.selectsTwo];
    this.filteredOptionsTwo = [];
    this.selectsTwo = [];
    this.onChange(this.selectsTwo);
  }

  selectOneList(item: Agents, event: Event): void {
    event.preventDefault();
    this.selectsTwo.push(item);
    const itemSearched = this.filteredOptions.findIndex((i: any) => item.id === i.id);
    this.filteredOptions.splice(itemSearched, 1);
    this.filteredOptionsTwo = this.selectsTwo;
    this.onChange(this.selectsTwo);
  }

  selectTwoList(item: Agents, event: Event): void {
    event.preventDefault();
    const itemSearched = this.selectsTwo.findIndex((i: any) => item === i);
    this.selectsTwo.splice(itemSearched, 1);
    this.filteredOptions.push(item);
    this.filteredOptionsTwo = this.selectsTwo;
    this.onChange(this.selectsTwo);
  }
}
