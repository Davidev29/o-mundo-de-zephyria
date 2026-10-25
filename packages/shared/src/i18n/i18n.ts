type Dictionary = Record<string, string>;

const dictionaries: Record<string, Dictionary> = {
  "pt-BR": {
    "menu.title": "O Mundo de Zephyria",
    "menu.start": "Pressione Enter para começar",
    "hud.level": "Nível",
    "hud.health": "Vida",
    "hud.stamina": "Stamina",
  },
  en: {
    "menu.title": "The World of Zephyria",
    "menu.start": "Press Enter to start",
    "hud.level": "Level",
    "hud.health": "Health",
    "hud.stamina": "Stamina",
  },
};

let currentLocale = "pt-BR";

export function setLocale(locale: string): void {
  if (dictionaries[locale]) currentLocale = locale;
}

export function t(key: string, fallback?: string): string {
  return dictionaries[currentLocale]?.[key] ?? fallback ?? key;
}

export function getLocale(): string {
  return currentLocale;
}
