import { get } from 'env-var';
import { IAppConfiguration } from '../../../infrastructure/shared';

export class AppConfiguration implements IAppConfiguration {
  private static PORT = 'PORT';
  private static MAILER_EMAIL = 'MAILER_EMAIL';
  private static MAILER_SECRET_KEY = 'MAILER_SECRET_KEY';
  private static PROD = 'PROD';

  port: number;
  mailerEmail: string;
  mailerSecretKey: string;
  prod: boolean;

  constructor() {
    this.port = get(AppConfiguration.PORT).required().asPortNumber();
    this.mailerEmail = get(AppConfiguration.MAILER_EMAIL).required().asEmailString();
    this.mailerSecretKey = get(AppConfiguration.MAILER_SECRET_KEY).required().asString();
    this.prod = get(AppConfiguration.PROD).required().asBool();
  }
}
