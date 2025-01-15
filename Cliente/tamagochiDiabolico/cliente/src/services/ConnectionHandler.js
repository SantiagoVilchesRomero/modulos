import { connect, io } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";

export const ConnectionHandler = {
    connected: false,
    socket: null,
    url: null,
    init: ( url, onConnectedCallback, onDisconnectedCallback) => {
        ConnectionHandler.socket = io(url);
        ConnectionHandler.socket.on("connect", (data) => {
            ConnectionHandler.connected = true;
            console.log(data);
            onConnectedCallback();
        });
        ConnectionHandler.socket.on("disconnect", () => {
            ConnectionHandler.connected = false;
            onDisconnectedCallback();
        });
    }
}