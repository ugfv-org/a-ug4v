import { loadDefaultJapaneseParser } from 'budoux';

const japaneseParser = loadDefaultJapaneseParser();
const japaneseTextPattern = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;

export const segmentJapaneseText = (text) => {
  if (!japaneseTextPattern.test(text) || text.includes('\u200b')) {
    return text;
  }

  return japaneseParser.parse(text).join('\u200b');
};

export const remarkBudoux = () => {
  const visit = (node) => {
    if (!node || typeof node !== 'object') {
      return;
    }

    if (node.type === 'text' && typeof node.value === 'string') {
      node.value = segmentJapaneseText(node.value);
      return;
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit);
    }
  };

  return visit;
};
