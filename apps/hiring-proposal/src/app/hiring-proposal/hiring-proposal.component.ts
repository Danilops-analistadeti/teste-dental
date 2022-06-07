import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authenticate, TokenDecoded } from '@auth-lib';
import {
  OfferService,
  OfferStatus,
  Quotation,
  quoteUnavailable,
  QuoteUnavailable,
  rejectAlertDialog
} from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import jwtDecode from 'jwt-decode';
import { StateReset } from 'ngxs-reset-plugin';
import { UserService } from './../../../../shell/src/app/modules/user/services/user.service';
import { OfferAction } from './actions/hiring-proposal.action';
import { QuotationProposalAction } from './actions/quotation-proposal.actions';
import { INIT_LOADING_HIRING_PROPOSAL } from './constant/init-loading-hiring-proposal.constant';
import { OFFER_EXISTS_MESSAGE } from './constant/offer-exists-message.constant';
import { QuotationProposal } from './interfaces/quotation-proposal.interface';
import { HiringProposalService } from './services/hiring-proposal.service';
import { OfferState } from './states/offer.state';
import { QuotationProposalState } from './states/quotation-proposal.state';

@Component({
  selector: 'ec-hiring-proposal',
  templateUrl: './hiring-proposal.component.html',
  styleUrls: ['./hiring-proposal.component.scss']
})
export class HiringProposalComponent implements OnInit, OnDestroy {
  quotation: Quotation;
  quotationProposal: QuotationProposal;
  loading = INIT_LOADING_HIRING_PROPOSAL;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private hiringProposalService: HiringProposalService,
    private notificationsService: NotificationsService,
    private store: Store,
    private changeDetection: ChangeDetectorRef,
    private offerService: OfferService,
    private userService: UserService
  ) { }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.resetState();
  }


  ngOnInit(): void {
    this.resetState();
    this.getQuotationProposal();
    this.setAcceptTermLgpd();
  }

  resetState(): void {
    this.store.dispatch(new StateReset(OfferState));
    this.store.dispatch(new StateReset(QuotationProposalState));
  }

  setAcceptTermLgpd(): void {
    const { token } = this.activatedRoute?.snapshot?.queryParams as QuotationProposal;
    const { user_id } = jwtDecode(token) as TokenDecoded;
    this.userService.acceptLgpdUser(String(user_id)).subscribe();
  }

  getQuotationProposal(): void {
    this.quotationProposal = this.activatedRoute?.snapshot?.queryParams as QuotationProposal;
    this.router.navigate([], { replaceUrl: true });

    if (!this.quotationProposal?.quotationId) {
      this.quotationProposal = this.store.selectSnapshot(QuotationProposalState);
    }

    this.store.dispatch(new Authenticate({ token: this.quotationProposal.token })).subscribe({
      next: () => this.setAndGetQuotation()
    });
  }

  getQuotation(quotationProposal: QuotationProposal): void {
    this.loading.getQuotation = true;

    if (!quotationProposal.quotationId) {
      this.router.navigateByUrl('auth');
      return;
    }

    this.hiringProposalService
      .getQuotationById(quotationProposal.quotationId)
      .subscribe({
        next: (response) => {
          this.quotation = response;
          this.getLastOfferByQuotation();
        }
      })
      .add(() => this.changeDetection.detectChanges());
  }

  async getLastOfferByQuotation(): Promise<void> {
    try {
      const offer = await this.hiringProposalService.getLastOfferByQuotationId(this.quotationProposal.quotationId);
      this.notificationsService.warning(OFFER_EXISTS_MESSAGE);
      offer.sourceOffer = offer.id;

      this.store.dispatch(new OfferAction(offer));
    } catch {
      this.validOffer();
    } finally {
      this.loading.getQuotation = false;
      this.changeDetection.detectChanges();
    }
  }

  setAndGetQuotation(): void {
    this.store.dispatch(new QuotationProposalAction(this.quotationProposal)).subscribe({
      next: (response) => this.getQuotation(response?.quotationProposal)
    });
  }

  validOffer(): void {
    this.validRejectOrRefused();
  }

  navigateQuoteUnavailable(): void {
    this.navigateWithState('/proposal/quote-unavailable', {
      message: quoteUnavailable
    });
  }

  validRejectOrRefused(): void {
    if (this.quotationProposal?.interesse === '0') {
      this.rejectOffer();
    } else if (this.quotationProposal?.refusedRevision) {
      this.refusedRevision();
    }
  }

  rejectOffer(): void {
    this.loading.rejectOfferLoading = true;

    this.hiringProposalService
      .refuserOffer(this.quotation.id)
      .subscribe({
        next: () => this.successRejectOffer(),
        error: () => this.notificationsService.error('Ops, aconteceu algum problema, tente novamente mais tarde!')
      })
      .add(() => (this.loading.rejectOfferLoading = false));
  }

  successRejectOffer(): void {
    this.store.dispatch(new StateReset(QuotationProposalState));
    const unavailableQuotation: QuoteUnavailable = {
      message: rejectAlertDialog.text,
      subtitle: rejectAlertDialog.subtitle
    };

    this.navigateWithState('/proposal/quote-unavailable', unavailableQuotation);
  }

  refusedRevision(): void {
    const offerStatusKeys = Object.keys(OfferStatus);

    this.offerService
      .setStatusOffer({
        id: this.quotationProposal?.offerId,
        status: offerStatusKeys[6]
      })
      .subscribe({
        next: () => this.successRefuseOffer(),
        error: (err) => this.notificationsService.error(err?.error?.message)
      });
  }

  successRefuseOffer(): void {
    const unavailableQuotation: QuoteUnavailable = {
      message: rejectAlertDialog.text,
      subtitle: rejectAlertDialog.subtitle
    };
    this.navigateWithState('/proposal/quote-unavailable', unavailableQuotation);
    this.store.dispatch(new StateReset(QuotationProposalState));
  }

  navigateWithState(url: string, state: any): void {
    this.router.navigateByUrl(url, { state });
  }
}
