import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { EnergySource, Owner, PriceType, Quotation, QuotationStatus, SubMarketRegion } from '@energy-contracting';
import { OffersReceivedComponent } from '../offers-received/offers-received.component';

@Component({
  selector: 'ec-quotation-item',
  templateUrl: './quotation-item.component.html',
  styleUrls: ['./quotation-item.component.scss']
})
export class QuotationItemComponent implements OnInit, OnDestroy {
  @ViewChild('offersReceived', { read: ViewContainerRef })
  container: ViewContainerRef;

  @Input() quotation: Quotation;
  hasOfferWinner: boolean;
  hasMultiAgents: boolean;
  nameOwner: string;
  nameOwnerTooltip: string;
  subMarketRegion = SubMarketRegion;
  quotationStatus = QuotationStatus;
  energySource = EnergySource;

  @Input() set reloaded(reload: boolean) {
    if (this.expanded && reload) {
      this.componentRef.instance.showDetail = true;
    }
  }

  componentRef: ComponentRef<OffersReceivedComponent>;
  expanded: boolean;
  priceTypeEnum = PriceType;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.formatNameOwner();
    this.hasOfferWinner = this.quotation?.countOffersWinners > 0;
  }

  formatNameOwner(): void {
    this.hasMultiAgents = this.quotation.owner && this.quotation.owner?.length > 1;
    if (this.hasMultiAgents) {
      this.nameOwner = 'VÁRIOS AGENTES';
      this.nameOwnerTooltip = this.transformOwners(this.quotation.owner);
    } else {
      this.nameOwner = this.quotation.owner[0].fantasyName;
      this.nameOwnerTooltip = null;
    }
  }

  transformOwners(owners: Owner[]): string {
    return owners.map((c) => c.fantasyName).join(', ');
  }

  ngOnDestroy(): void {
    this.destroyedComponent();
  }

  showExpanded(): void {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.createComponent();
    } else {
      this.destroyedComponent();
    }
  }

  destroyedComponent(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  createComponent(): void {
    this.container.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(OffersReceivedComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.hasOfferWinner = this.hasOfferWinner;
    this.componentRef.instance.quotation = this.quotation;
    this.componentRef.instance.showDetail = this.expanded;
  }
}
