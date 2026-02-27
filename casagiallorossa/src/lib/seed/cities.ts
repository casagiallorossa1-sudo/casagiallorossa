export type CitySeed = {
  slug: string;
  name: string;
  country: string;
  timezone: string;
  primaryLanguage: "it" | "en";
};

export const CITIES: CitySeed[] = [
  { slug: "roma", name: "Roma", country: "IT", timezone: "Europe/Rome", primaryLanguage: "it" },
  { slug: "milano", name: "Milano", country: "IT", timezone: "Europe/Rome", primaryLanguage: "it" },
  { slug: "napoli", name: "Napoli", country: "IT", timezone: "Europe/Rome", primaryLanguage: "it" },
  { slug: "torino", name: "Torino", country: "IT", timezone: "Europe/Rome", primaryLanguage: "it" },

  { slug: "londra", name: "Londra", country: "GB", timezone: "Europe/London", primaryLanguage: "en" },
  { slug: "new-york", name: "New York", country: "US", timezone: "America/New_York", primaryLanguage: "en" },

  { slug: "madrid", name: "Madrid", country: "ES", timezone: "Europe/Madrid", primaryLanguage: "it" },
  { slug: "atene", name: "Atene", country: "GR", timezone: "Europe/Athens", primaryLanguage: "it" },
  { slug: "vienna", name: "Vienna", country: "AT", timezone: "Europe/Vienna", primaryLanguage: "it" },
  { slug: "zurigo", name: "Zurigo", country: "CH", timezone: "Europe/Zurich", primaryLanguage: "it" },
];
