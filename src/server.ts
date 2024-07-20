import app from "./app";
import { MongoDatabase } from "./infrastructure/database/MongoDatabase";
const database = new MongoDatabase(process.env.MONGODB_URI as string);

database.connect()
  .then(() => console.log('Connected to database'))
  .catch((error) => console.error('Database connection error:', error));
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
