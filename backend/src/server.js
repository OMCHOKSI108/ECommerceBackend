const app = require("./app");
const env = require("./config/env");
const pool = require("./db/pool");
const initDb = require("./db/init");

const startServer = async () => {
  try {
    await pool.query("SELECT 1");
    await initDb();

    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running at http://localhost:${env.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
