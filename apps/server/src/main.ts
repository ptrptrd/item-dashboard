/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { Application } from "express";
import Server from "./index";

const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080; 

new Server(app);

app.listen( port, "localhost", function () {
    console.log("Server running on port: " + port);
}).on ("error", (err: any) => {
    if (err.code == "EADDRINUSE") {
        console.log("Error: address is already in use");
    } else {
        console.log(err)
    }
})

