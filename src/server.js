require('dotenv').config();
const PORT = process.env.PORT || 8000;
const app = require("./app");

const connectDB = require("./db/connect");

connectDB(); // This will execute the connection string to connect to the database.

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);