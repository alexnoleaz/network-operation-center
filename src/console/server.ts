import { CheckService } from '../application/features';
import { CronService } from './cron';

export class Server {
  start() {
    console.log('Server started...');

    const cron = new CronService('*/5 * * * * *');
    cron.start(() => {
      const url = 'https://google.com';
      new CheckService(
        () => console.log(`${url} is ok`),
        error => console.error(error)
      ).execute(url);
    });
  }
}
