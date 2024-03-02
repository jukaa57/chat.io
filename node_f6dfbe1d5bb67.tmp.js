import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
    app.use(express.static('public'));
});     

io.on('connection', (socket) => {
    socket.on('new user', (name) => {
        io.emit('new user', name)
    })

    socket.on('chat message', (msg, n) => {
        io.emit('chat message', msg, n)
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
});

server.listen(3033, () => console.log('server running at http://localhost:3033'));