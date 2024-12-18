require('dotenv').config(); // Load environment variables from .env
const {Client} = require('pg');

// PostgreSQL connection using the connection string
const client = new Client({
    connectionString: process.env.DATABASE_URL, // Load connection string from .env
  });


// Connect to PostgreSQL
const connectDB = () => {
  client.connect().then(() => {
    console.log('Connected to PostgreSQL database successfully!');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database:', err.stack);
  });
}
  
module.exports = connectDB