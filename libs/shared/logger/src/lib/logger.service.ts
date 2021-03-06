import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as Winston from 'winston';
import * as SlackHook from 'winston-slack-webhook-transport';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  Logger: Winston.Logger;
  constructor() {
    super();
    this.Logger = Winston.createLogger({
      level: 'debug',
      format: Winston.format.json(),
      transports: [
        new Winston.transports.Console(),
        new SlackHook({
          webhookUrl: process.env.SLACK_HOOK_URL,
        }),
      ],
      exitOnError: false,
      silent: process.env.NODE_ENV !== 'production' ? true : false,
    });
  }
  info(message: string) {
    super.log(message);
    this.Logger.info(message);
  }
  error(message: string) {
    super.error(message);
    this.Logger.error(message);
  }
  warn(message: string) {
    super.warn(message);
    this.Logger.warn(message);
  }
  debug(message: string) {
    super.debug(message);
    this.Logger.debug(message);
  }
  critical(message: string) {
    super.error(message);
    this.Logger.error(message);
  }
}
