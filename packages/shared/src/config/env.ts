export interface AppConfig {
  apiBaseUrl: string;
  telemetryEnabled: boolean;
  environment: "development" | "production";
}

const defaults: AppConfig = {
  apiBaseUrl: "http://localhost:3000",
  telemetryEnabled: false,
  environment: "development",
};

function readEnv(): AppConfig {
  const w = (typeof window !== "undefined" ? (window as unknown as { __ENV__?: Partial<AppConfig> }).__ENV__ : undefined) ?? {};
  return { ...defaults, ...w };
}

export const config: AppConfig = readEnv();
