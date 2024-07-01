import { connectDB } from "./db/index.db.js";
connectDB();

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
