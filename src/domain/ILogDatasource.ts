import { Log } from './Log';
import { LogSeverityLevel } from './LogSeverityLevel';

export interface ILogDatasource {
  save(log: Log): Promise<void>;
  getAll(logSeverityLevel: LogSeverityLevel): Promise<Log[]>;
}
