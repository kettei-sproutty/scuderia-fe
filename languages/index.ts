import "server-only";

type Locales = ["en", "it"];

export const getDictionary = async (locale: Locales, defaultWorkspace = "common") => {
  const dictionary = await import(`./${locale}.json`);

  return (key: string, subs: Record<string, string> = {}) => {
    const value = dictionary[defaultWorkspace][key] || key;
    return Object.entries(subs).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      value,
    );
  };
};
