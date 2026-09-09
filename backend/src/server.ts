import app from './app';
import { config } from './config/environment';
import { connectDB } from './config/db';
import { seedDatabase } from './services/seedService';

// Start Server for standalone Node.js development or traditional container runtime
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(config.port, () => {
    console.log(`
=====================================================
  🕊️ VATSALYA VATIKA ASHRAM BACKEND REST API RUNNING
  📡 PORT: ${config.port}
  🌐 HEALTH CHECK: http://localhost:${config.port}/api/health
=====================================================
    `);
  });
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
});

