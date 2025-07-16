import { createApp } from './app.js';
import { config } from './config/index.js';

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`Coffee Brew app listening on port ${config.port}`);
});

function shutDown() {
  console.log('🔄  Shutting down gracefully...');
  server.close(() => {
    console.log('✅  Closed out remaining connections');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', shutDown);
process.on('SIGINT',  shutDown);