import { config } from "dotenv";

// Load environment variables from a .env file based on the current NODE_ENV
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
// Export the environment variables
export const { 
    PORT, 
    NODE_ENV, 
    DB_URI, 
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARKJET_KEY,
    ARKJET_ENV,
    QSTASH_URL,
    QSTASH_TOKEN,
    SERVER_URL,
    EMAIL_PASSWORD,
} = process.env;
// Export the PORT variable for use in other parts of the application

