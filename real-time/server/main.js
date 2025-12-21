import express from "express"
import { WebSocketServer } from "ws";
import http from "http"


const app = express();
app.use(express.json());
const port = 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server})

wss.on("connection",(ws)=>{
    console.log(" client connected")
    ws.on("message",(data)=>{
        console.log(" message received",data.toString())

        ws.send(" hello from server")

    })

    ws.on("close",(data)=>{
        console.log(" client closed successfully")
    });
});

app.get("/health",( req, res)=>{

    return res.status(200).json(
        {
            message:" server is healthy"
        }
    )
})

server.listen(port,()=>{
    console.log(` the server is runnning at port ${port} `);
})
