import express from "express"
import { WebSocketServer, WebSocket } from "ws";
import http from "http"


const app = express();
app.use(express.json());
const port = 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server})

wss.on("connection",(ws)=>{
    console.log(" client connected")
    ws.on("message",(data)=>{

        try{
            // data.send(" hello")
            const {username ,message} = JSON.parse(data);
            console.log(`${username}:${message}`);

            const outgoing = JSON.stringify({ username, message});
            wss.clients.forEach( (client)=>{
                if( client !== ws && client.readyState === WebSocket.OPEN){
                    client.send(outgoing);
                }
            })

        }catch(err){
            console.error(" invalid messages ",err);

        }

    })

    ws.on("close",()=>{
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
