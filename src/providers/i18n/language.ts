export class Language {
  code: string;
  name: string;
}

const english: Language = {
  code: 'en',
  name: 'English'
};
const polish: Language = {
  code: 'pl',
  name: 'Polish'
};

export const availableLanguages: Language[] = [english, polish];

export const defaultLanguage: Language = english;
