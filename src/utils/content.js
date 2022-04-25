import enUS from 'content/enUS';

const languageDefault = 'en-US';
const languageOptions = {
  ...enUS
};

/**
 * Builds localized content based on the user's browser default language or the app default language.
 * @returns {object} - Object containing app content localized to either the browser language or the default language.
 */
export const getContent = () => {
  if (!navigator?.language) return languageOptions[languageDefault];
  return languageOptions[navigator.language] || languageOptions[languageDefault];
};

/**
 * Utility for displaying localized content based on the user's browser default language.
 * @returns {object} - Object containing app content localized to either the browser language or the default language.
 */
const content = getContent();

export default content;
