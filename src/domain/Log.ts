import { LogSeverityLevel } from './LogSeverityLevel';

export class Log {
  level: LogSeverityLevel;
  message: string;
  createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  static fromJSON(json: string): Log {
    const { message, level, createdAt }: Log = JSON.parse(json);

    const log = new Log(message, level);
    log.createdAt = new Date(createdAt);
    return log;
  }

  toJSON(log: Log): string {
    return `${JSON.stringify(log)}`;
  }
}
