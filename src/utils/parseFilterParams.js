function parseContactType(contactType) {
  const isString = typeof contactType === 'string';

  if (!isString) return;

  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType) === true) return contactType;
}

function parseIsFavourite(isFavourite) {
  const isString = typeof isFavourite === 'string';

  if (!isString) return;

  if (isFavourite === 'true') return 'true';
  if (isFavourite === 'false') return 'false';
}

export function parseFilterParams(query) {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
}
