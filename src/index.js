import app from "./app.js";
import { connectToDatabase } from  "./db/dbConnection.js";


const PORT = process.env.PORT | 3000;

connectToDatabase().then(()=>{
    app.listen(PORT, () => console.log("Server open, Connected to Database {MongoDB}"));
}).catch((err)=> console.log(err));
