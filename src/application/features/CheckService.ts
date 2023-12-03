import { ILogRepository, Log, LogSeverityLevel } from '../../domain';

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService {
  constructor(
    private readonly logRepository: ILogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<void> {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error on check service: ${url}`);

      const log = new Log(`Service ${url} working`, LogSeverityLevel.LOW);
      this.logRepository.save(log);

      this.successCallback();
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new Log(errorMessage, LogSeverityLevel.HIGH);
      this.logRepository.save(log);

      this.errorCallback(`${error}`);
    }
  }
}
