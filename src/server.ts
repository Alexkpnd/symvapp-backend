import { connectDB } from "./utils/db";
import app from "./app";


const port = process.env.PORT;

const ServerStart = async() => {
    await connectDB();
    app.listen(port, () => {
        console.log("Server up running at port:", port)
    });
}

ServerStart();