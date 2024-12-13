Funcionalidades Principales
1. fetchValvesStates
Realiza una solicitud GET a la API del servidor para obtener el estado inicial de las válvulas.
Uso principal: Sincronizar los estados de las válvulas entre cliente y servidor.
2. Cliente.send(data)
Envía solicitudes POST al servidor para actualizar el estado de una válvula específica.
Uso principal: Registrar cambios de estado en el backend.


Check
Clase que maneja la lógica para los controles de las válvulas, agregando nuevos switches y actualizando el estado de las válvulas.

El servidor utiliza Express.js y Socket.IO para manejar las solicitudes y la comunicación en tiempo real.