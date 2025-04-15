export const normalizeCountyName = (str: string, isLouisiana = false) => {
  const lowerCaseStr = str.toLowerCase();
  const endsWithCounty = lowerCaseStr.endsWith(' county');
  const endsWithParish = lowerCaseStr.endsWith(' parish');

  if (!endsWithCounty && !endsWithParish) {
    if (isLouisiana) {
      return str.trim() + ' PARISH';
    } else {
      return str.trim() + ' COUNTY';
    }
  }

  return str;
};
