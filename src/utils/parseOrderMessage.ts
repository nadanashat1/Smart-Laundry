import { AiAssistantData, CartData } from "../Data";

export type DraftItem = {
  id: string;
  name: string;
  service: string;
  quantity: number;
  price: number;
};

export type OrderDraft = {
  items: DraftItem[];
  schedule: string;
  estimate: number;
};

const { itemKeywords, numberWords, schedules } = AiAssistantData;

function normalize(text: string) {
  return text
    .replace(/[أإآ]/g, "ا")
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function findQuantity(text: string, words: string[], dual: string) {
  if (text.includes(normalize(dual))) return 2;

  for (const word of words) {
    const normalizedWord = normalize(word);
    if (!text.includes(normalizedWord)) continue;

    const before = text.split(normalizedWord)[0].trim().split(/\s+/).pop() ?? "";
    const number = Number(before);
    if (number > 0) return number;
    if (numberWords[before]) return numberWords[before];

    return 1;
  }

  return 0;
}

function findSchedule(text: string) {
  const hasAny = (words: string[]) =>
    words.some((word) => text.includes(normalize(word)));

  const day = hasAny(schedules.tomorrowWords)
    ? schedules.tomorrow
    : schedules.today;

  const time = hasAny(schedules.eveningWords)
    ? schedules.evening
    : hasAny(schedules.morningWords)
      ? schedules.morning
      : schedules.defaultTime;

  return `${day}، ${time}`;
}

export function parseOrderMessage(message: string): OrderDraft | null {
  const text = normalize(message);

  const items = itemKeywords
    .map((keyword) => {
      const quantity = findQuantity(text, keyword.words, keyword.dual);
      const cartItem = CartData.items.find((item) => item.id === keyword.id);
      if (!quantity || !cartItem) return null;

      return {
        id: cartItem.id,
        name: cartItem.name,
        service: cartItem.service,
        quantity,
        price: cartItem.price,
      };
    })
    .filter((item): item is DraftItem => item !== null);

  if (items.length === 0) return null;

  return {
    items,
    schedule: findSchedule(text),
    estimate: items.reduce((sum, item) => sum + item.quantity * item.price, 0),
  };
}
