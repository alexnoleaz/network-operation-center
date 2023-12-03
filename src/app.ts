import { Server } from './console';

(() => main())();

function main(): void {
  const server = new Server();
  server.start();
}
