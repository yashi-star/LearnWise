import { Server as SocketIOServer } from "socket.io";
import http from 'http';

export const initSocketServer = (server: http.Server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "http://localhost:3000", // Change based on frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log('A user connected ', socket.id);

        // Listen for notification event from the frontend
        socket.on("notification", (data) => {
            console.log("Received notification:", data);
            io.emit('newNotification', data); // Broadcast to all clients
        });

        socket.on("disconnect", () => {
            console.log('A user disconnected', socket.id);
        });
    });
};
