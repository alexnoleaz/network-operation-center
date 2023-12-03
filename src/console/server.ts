import { CheckService } from '../application/features';
import { LogRepository } from '../infrastructure';
import { LogFileSystemDatasource } from '../infrastructure/datasources';
import { CronService } from './cron';

export class Server {
  start(): void {
    console.log('Server started...');
    const logFileSystemDatasource = new LogFileSystemDatasource();

    const cron = new CronService('*/5 * * * * *');
    cron.start(async () => {
      const url = 'http://localhost:3000';
      // const url = 'https://google.com';
      const checkService = new CheckService(
        new LogRepository(logFileSystemDatasource),
        () => console.log(`${url} is ok`),
        (error) => console.error(error)
      );
      await checkService.execute(url);
    });
  }
}
