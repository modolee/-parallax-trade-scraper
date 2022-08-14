export function parseFloatFromString(
  numberString: string,
  removeCharacters: string[],
) {
  let result = numberString;

  removeCharacters.map((character) => {
    result = result.replace(character, '');
  });

  return Number.parseFloat(result);
}
