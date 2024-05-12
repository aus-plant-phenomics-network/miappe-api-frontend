const toSnakeCase = (text: string) => {
  return text.replace(/ /g, "_");
};

const capitalise = (text: string) => {
  let processedText = text.trim();
  if (processedText.length == 0) return "";
  if (processedText.length == 1) return text[0]?.toUpperCase();

  processedText = toSnakeCase(processedText);
  const snakeToCamel = (s: string) =>
    s.replace(/(_\w)/g, k => k[1]!.toUpperCase());
  processedText = snakeToCamel(processedText);
  return processedText[0]!.toUpperCase() + processedText.slice(1);
};

const removeId = (text: string) => {
  return text.endsWith("Id") ? text.substring(0, text.length - 2) : text;
};

const string2Date = (text?: string | null) => {
  if (text) {
    const parsedDate = new Date(text);
    if (!isNaN(parsedDate.getDate())) {
      return parsedDate;
    }
  }
  return null;
};

export { capitalise, toSnakeCase, string2Date, removeId };
