import fs from 'fs';
import { ILogDatasource, Log, LogSeverityLevel } from '../../domain';

export class LogFileSystemDatasource implements ILogDatasource {
  private readonly logsPath = 'logs/';
  private readonly lowPath = `${this.logsPath}${LogSeverityLevel.LOW}.log`;
  private readonly mediumPath = `${this.logsPath}${LogSeverityLevel.MEDIUM}.log`;
  private readonly highPath = `${this.logsPath}${LogSeverityLevel.HIGH}.log`;

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles(): void {
    if (!fs.existsSync(this.logsPath)) fs.mkdirSync(this.logsPath);

    const paths = [this.lowPath, this.mediumPath, this.highPath];
    paths.forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, '');
    });
  }

  private getAllFromFile(path: string): Log[] {
    const content = fs.readFileSync(path, 'utf-8');
    return content.split('\n').map(Log.fromJSON);
  }

  async save(log: Log): Promise<void> {
    const data = `${Log.toJSON(log)}\n`;

    if (log.level === LogSeverityLevel.LOW)
      fs.appendFileSync(this.lowPath, data);
    if (log.level === LogSeverityLevel.MEDIUM)
      fs.appendFileSync(this.mediumPath, data);
    if (log.level === LogSeverityLevel.HIGH)
      fs.appendFileSync(this.highPath, data);
  }

  async getAll(logSeverityLevel: LogSeverityLevel): Promise<Log[]> {
    switch (logSeverityLevel) {
      case LogSeverityLevel.LOW:
        return this.getAllFromFile(this.lowPath);
      case LogSeverityLevel.MEDIUM:
        return this.getAllFromFile(this.mediumPath);
      case LogSeverityLevel.HIGH:
        return this.getAllFromFile(this.highPath);
      default:
        throw new Error(`${logSeverityLevel} not implemented`);
    }
  }
}
