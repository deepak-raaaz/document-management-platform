import { app } from "./app";
import connectDB from "./utlis/db";

app.listen(8080 , () => {
    console.log(`server is connected to `);
    connectDB();
})