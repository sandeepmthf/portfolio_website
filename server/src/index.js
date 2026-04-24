const dotenv = require("dotenv");
const connectDB = require("./config/db");
const seedInitialData = require("./utils/seedData");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    await seedInitialData();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server", error.message);
    process.exit(1);
  }
};

start();
