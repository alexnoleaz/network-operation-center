import { CheckService } from '../application/features';
import { CronService } from './cron';

export class Server {
  start(): void {
    console.log('Server started...');

    const cron = new CronService('*/5 * * * * *');
    cron.start(async () => {
      const url = 'https://google.com';
      const checkService = new CheckService(
        () => console.log(`${url} is ok`),
        (error) => console.error(error)
      );
      await checkService.execute(url);
    });
  }
}
