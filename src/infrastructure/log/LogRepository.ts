import {
  ILogDatasource,
  ILogRepository,
  Log,
  LogSeverityLevel,
} from '../../domain';

export class LogRepository implements ILogRepository {
  private readonly _logDatasource: ILogDatasource;

  constructor(logDatasource: ILogDatasource) {
    this._logDatasource = logDatasource;
  }

  async save(log: Log): Promise<void> {
    this._logDatasource.save(log);
  }

  async getAll(logSeverityLevel: LogSeverityLevel): Promise<Log[]> {
    return await this._logDatasource.getAll(logSeverityLevel);
  }
}
