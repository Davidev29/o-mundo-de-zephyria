import { describe, it, expect } from "vitest";
import { t, setLocale, getLocale } from "./i18n";

describe("i18n", () => {
  it("translates keys", () => {
    setLocale("pt-BR");
    expect(t("menu.title")).toBe("O Mundo de Zephyria");
  });
  it("falls back to key", () => {
    expect(t("unknown.key")).toBe("unknown.key");
  });
  it("switches locale", () => {
    setLocale("en");
    expect(getLocale()).toBe("en");
    expect(t("menu.title")).toBe("The World of Zephyria");
    setLocale("pt-BR");
  });
});
