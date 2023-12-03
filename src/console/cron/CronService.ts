import { CronJob } from 'cron';

import { ICronService } from './ICronService';
import { CronTime, OnTick } from './CronTypes';

export class CronService implements ICronService {
  private cronTime: CronTime;
  private job?: CronJob;

  constructor(cronTime: CronTime) {
    this.cronTime = cronTime;
  }

  start(onTick: OnTick) {
    this.job = new CronJob(this.cronTime, onTick);
    this.job.start();
  }

  stop() {
    this.job?.stop();
  }
}
