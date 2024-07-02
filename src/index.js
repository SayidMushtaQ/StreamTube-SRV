import { connectDB } from "./db/index.db.js";
import {app} from './app.js'

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT,() => {
        console.log(`🌐 Server Run At: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB Connection FAILED: ", err);
  });

/*
const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.MONGODB_SRC;
(async () => {
  try {
    await mongoose.connect(DATABASE_URL+ "/" + DB_NAME);
    app.on("error", err => {
      console.error("Error: ", err);
      throw err;
    });
    app.listen(PORT,()=>{
        console.log(`Server run at: http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error("Error: ", err);
    throw err;
  }
})();
*/
