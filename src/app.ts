import { Server } from './console';

(() => main())();

function main() {
  const server = new Server();
  server.start();
}
