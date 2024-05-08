const toSnakeCase = (text: string) => {
  let processedText = text.trim();
  processedText = processedText.replace(/ /g, "_");
  return processedText;
};

const capitalise = (text: string) => {
  let processedText = toSnakeCase(text);
  const snakeToCamel = (s: string) =>
    s.replace(/(_\w)/g, (k) => k[1].toUpperCase());
  processedText = snakeToCamel(processedText);
  return processedText[0].toUpperCase() + processedText.slice(1);
};

const string2Date = (text?: string) => {
  return text ? new Date(text) : null;
};

export { capitalise, toSnakeCase, string2Date };
