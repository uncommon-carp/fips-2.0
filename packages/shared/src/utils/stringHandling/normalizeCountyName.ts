export const normalizeCountyName = (str: string, isLouisiana = false) => {
  const cased = str.toUpperCase();
  const endsWithCounty = cased.endsWith(' COUNTY');
  const endsWithParish = cased.endsWith(' PARISH');

  if (!endsWithCounty && !endsWithParish) {
    if (isLouisiana) {
      return cased.trim() + ' PARISH';
    } else {
      return cased.trim() + ' COUNTY';
    }
  }

  return str;
};
