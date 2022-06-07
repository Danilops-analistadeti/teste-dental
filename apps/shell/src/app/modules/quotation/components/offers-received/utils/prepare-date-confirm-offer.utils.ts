import {
  companyOrSeller,
  ConfirmProposal,
  getPaymentDayTypeFormatted,
  isRetusd,
  Offer,
  Quotation
} from '@energy-contracting';

export const prepareDateToConfirmOffer = (item: Offer, quotation: Quotation): ConfirmProposal => {
  const typeBuysSeller = companyOrSeller(item.companyName, quotation.owner, quotation.quotationType);

  return {
    offerQuotation: quotation,
    paymentBusinessDay: item.paymentBusinessDay,
    paymentDayType: getPaymentDayTypeFormatted(item.paymentDayType),
    price: item.price,
    proposalExpiration: item.proposalExpiration,
    retusd: item.retusd,
    showRetusd: isRetusd(quotation.energySource),
    companyBuyers: typeBuysSeller.companyBuyers,
    companySellers: typeBuysSeller.companySellers,
    buttoName: 'fechar com a oferta',
    title: 'Confirmar a oferta?',
    energyVolumeAverage: item.energyVolumeAverage,
    priceType: quotation.priceType,
    offerId: item.id,
    indexer: item.indexer,
    minimumSeasonality: item.minimumSeasonality,
    maximumSeasonality: item.maximumSeasonality,
    minimumFlexibility: item.minimumFlexibility,
    maximumFlexibility: item.maximumFlexibility,
    minimalModulation: item.minimalModulation,
    maximumModulation: item.maximumModulation,
    modulationType: item.modulationType,
    financialGuarantee: item.financialGuarantee,
    offerType: item.offerType
  } as ConfirmProposal;
};
