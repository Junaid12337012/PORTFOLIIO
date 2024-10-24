import { Client, Account, Databases } from 'appwrite';
import dotenv from 'dotenv';
import process from 'process';

// Check environment and load respective .env file
const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${NODE_ENV}` });

// Validate required environment variables for production
const requiredEnvVars = [
  'APPWRITE_ENDPOINT',
  'APPWRITE_PROJECT_ID',
  'APPWRITE_API_KEY',
  'APPWRITE_DATABASE_ID',
  'APPWRITE_COLLECTION_ID',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Error: Missing required environment variable ${envVar}`);
    process.exit(1); // Exit the application if any required env var is missing
  }
});

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Appwrite endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID); // Appwrite project ID

// Initialize Appwrite services
const account = new Account(client);
const databases = new Databases(client);

// Custom logger (you can replace this with more advanced logging like winston)
const logger = (message) => {
  if (NODE_ENV !== 'production') {
    console.log(`[${NODE_ENV}] ${message}`);
  } else {
    // Use more advanced logging in production (e.g., logging to a file, using a logging service)
    // For example: Send logs to an external monitoring service like Sentry, Loggly, etc.
    console.log(`[Production] ${message}`);
  }
};

// Example: Create a new user
async function createUser(email, password) {
  try {
    const response = await account.create('unique()', email, password);
    logger(`User created successfully: ${response}`);
    return response;
  } catch (error) {
    logger(`Error creating user: ${error.message}`);
    throw error;
  }
}

// Example: Create a document in the database
async function createDocument(data) {
  try {
    const response = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      'unique()',
      data
    );
    logger(`Document created successfully: ${response}`);
    return response;
  } catch (error) {
    logger(`Error creating document: ${error.message}`);
    throw error;
  }
}

// Export the functions for use in other modules
export { createUser, createDocument };
