# Proyecto Tamagochi Diabólico

Estoy desarrollando un juego multijugador para navegador con arquitectura cliente-servidor. Los jugadores pueden conectarse a nuestro servidor, unirse a salas y jugar en un tablero interactivo.

## Cliente

### Descripción General

He desarrollado una interfaz web con JavaScript vanilla que se conecta a nuestro servidor mediante Socket.IO.

### Configuración

1. Para trabajar en el cliente:
   ```sh
   cd cliente
   ```
2. Instalación de dependencias:
   ```sh
   npm install
   ```
3. Para probar el juego, simplemente abre `index.html` en tu navegador.

### Estructura

- **UI:** He creado un sistema de renderizado para el tablero y jugadores usando CSS grid y HTML.
- **Game Controller:** Implementé un controlador para manejar la comunicación con el servidor.
- **Servicios:** Desarrollé servicios para gestionar conexiones y funcionalidades del juego.

### Archivos Principales

- `index.html`: Nuestra interfaz principal.
- `index.js`: Punto de entrada.
- `GameController.js`: Control del flujo de juego.
- `Ui.js` y `UIv1.js`: Implementación de la interfaz.
- `src/entities/`: Modelos de Tablero y Jugador.
- `src/services/`: Servicios de conexión y lógica del juego.

## Servidor

### Descripción General

Nuestro servidor está construido con Node.js y TypeScript, utilizando Socket.IO para la comunicación en tiempo real.

### Configuración

1. Para trabajar en el servidor:
   ```sh
   cd server
   ```
2. Instalación de dependencias:
   ```sh
   npm install
   ```
3. Para iniciar el servidor en modo desarrollo:
   ```sh
   npm run dev
   ```

### Estructura

- **Motor de Juego:** Creamos un sistema que gestiona el estado del juego.
- **Sistema de Salas:** Implementamos salas para agrupar jugadores.
- **Manejadores de Socket:** Gestionamos conexiones y mensajes de los clientes.
- **Generación de Tablero:** Desarrollamos algoritmos para crear tableros con elementos aleatorios.

### Archivos Principales

- `index.ts`: Punto de entrada.
- `src/game/`: Lógica del juego y generación de tableros.
- `src/player/`: Implementación de la entidad jugador.
- `src/room/`: Gestión de salas.
- `src/server/`: Implementación de Socket.IO.

## Problema Actual

Actualmente, me he quedado bloqueado en la implementación del movimiento del jugador. En el código de UI (`UIv1.js`), logro obtener el ID del socket del jugador cuando se hace clic en el botón de movimiento:

```js
document.getElementById("moveBtn").addEventListener("click", () => {
    currentPlayer = ConnectionHandler.socket.id;
    ConnectionHandler.socket.emit("message", {
        type: "MOVE",
        content: {
            id: currentPlayer,     
        }
    });
});
```

El problema es que no puedo acceder al objeto completo del jugador desde el cliente. El servidor necesita toda la información del jugador para actualizar su posición, pero solo estoy enviando el ID.

Estoy considerando varias soluciones:

- Modificar el servidor para localizar al jugador solo por ID.
- Almacenar más información del jugador en el cliente.
- Implementar un mecanismo específico para seguimiento de jugadores.

Por ahora, no puedo avanzar con la implementación del movimiento ya que no logro actualizar correctamente las posiciones de los jugadores.

