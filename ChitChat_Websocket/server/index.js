const express= require("express") 
import {WebSocketServer} from "ws"

const app=express()
const port=8080

const server=app.listen(port,()=>{
    console.log("server sunnn raha hh...");
})

const wss=new WebSocketServer({server})

wss.on("connection",(ws)=>{
    ws.on("message",(data)=>{
        console.log("data client se aarha %s:", data);
        ws.send("bdhaai ho!")
    })
})