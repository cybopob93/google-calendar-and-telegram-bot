import * as envalid from "envalid";
import type { ConfigServiceVariables } from "./config.service.d";

export class ConfigService {
  private readonly envConfig: ConfigServiceVariables;

  constructor() {
    this.envConfig = envalid.cleanEnv(process.env, {
      PORT: envalid.port({ default: 3000 }),

      GOOGLE_YOUR_CLIENT_ID: envalid.str(),
      GOOGLE_YOUR_CLIENT_SECRET: envalid.str(),
      GOOGLE_YOUR_REDIRECT_URL: envalid.str(),

      TELEGRAM_TOKEN_BOT: envalid.str(),

      RABBITMQ_URL: envalid.url(),
    });
  }

  public get(key: keyof ConfigServiceVariables): string {
    return this.envConfig[key].toString();
  }
}
