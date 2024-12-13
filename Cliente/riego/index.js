import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

const PORT = 3000;

const valveStates = {
    lista: [
        { name: 'riego1', state: false, group: 1 },
        { name: 'riego2', state: false, group: 1 },
        { name: 'riego1', state: false, group: 2 },
        { name: 'riego2', state: false, group: 2 },
        { name: 'riego1', state: false, group: 3 },
        { name: 'riego2', state: false, group: 3 }
    ]
};

app.get('/api/items', (req, res) => {    
    res.json(valveStates.lista);
});

// Conexión WebSocket
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.emit('initialState', valveStates.lista);

    socket.on('updateValve', (valveData) => {
        try {
            const valveIndex = valveStates.lista.findIndex(
                valve => valve.name === valveData.name && valve.group == valveData.group
            );

            if (valveIndex !== -1) {
                valveStates.lista[valveIndex].state = valveData.state;
                
                socket.broadcast.emit('valveStateChanged', valveStates.lista[valveIndex]);
                
                socket.emit('updateConfirmed', valveStates.lista[valveIndex]);
            }
        } catch (error) {
            socket.emit('error', { 
                message: 'Error actualizando válvula', 
                details: error.message 
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

io.on('error', (error) => {
    console.error('Error en el servidor WebSocket:', error);
});

httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});