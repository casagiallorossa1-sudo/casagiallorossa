import type { CityRow } from "@/lib/data";

export function defaultChat(city: CityRow) {
  const isItaly = city.country === "IT";
  if (isItaly) return city.whatsapp_url;
  return city.telegram_url;
}

export function chatLabel(city: CityRow) {
  const isItaly = city.country === "IT";
  return isItaly ? "WhatsApp" : "Telegram";
}
