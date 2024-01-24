import { Server } from './console';
import { AppConfiguration } from './console/shared/configuration';

(() => main())();

function main(): void {
  const server = new Server();
  server.start();

  const appConfiguration = new AppConfiguration();
  console.log(appConfiguration);
}
