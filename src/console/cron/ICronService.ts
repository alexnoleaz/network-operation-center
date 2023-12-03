import { OnTick } from './CronTypes';

export interface ICronService {
  start(onTick: OnTick): void;
  stop(): void;
}
