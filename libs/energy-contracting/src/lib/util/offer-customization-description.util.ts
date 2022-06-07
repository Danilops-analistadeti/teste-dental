export const getCustomizationDescription = (
  minimum: number,
  maximum: number
): string =>
  `${minimum ? minimum : 'Flat'} % mínima / ${
    maximum ? maximum : 'Flat'
  } % máxima`;
