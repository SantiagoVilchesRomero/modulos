# Laravel Pokémon App

Este proyecto es una aplicación web desarrollada con Laravel que permite gestionar una lista de Pokémon.

## Funcionalidades

- **Listado de Pokémon**: Muestra una tabla con todos los Pokémon registrados.
- **Crear Pokémon**: Permite añadir un nuevo Pokémon a la base de datos.
- **Editar Pokémon**: Permite modificar los datos de un Pokémon existente.
- **Eliminar Pokémon**: Permite eliminar un Pokémon de la base de datos.
- **Ver Detalles de Pokémon**: Muestra los detalles de un Pokémon específico.

## Capturas de Pantalla

### Listado de Pokémon

![Listado de Pokémon](/img/captura3.1.png)

### Crear Pokémon

![Crear Pokémon](/img/Captura3.2.png)

### Editar Pokémon

![Editar Pokémon](/img/captura3.3.png)

### Ver Detalles de Pokémon

![Detalles de Pokémon](/img/captura3.4.png)

## Instalación

Para poner en marcha la aplicación, sigue estos pasos:

1. **Clona el repositorio:**
    ```bash
    git clone https://github.com/Carlosrucar/traditionalLaravelAppPokemon.git
    cd traditionalLaravelApp
    ```

2. **Instala las dependencias:**
    ```bash
    composer install
    npm install
    ```

3. **Copia el archivo `.env` de ejemplo:**
    ```bash
    cp .env.example .env
    ```

4. **Genera la clave de la aplicación:**
    ```bash
    php artisan key:generate
    ```

5. **Configura las variables de entorno en el archivo `.env`.**

6. **Ejecuta las migraciones de la base de datos:**
    ```bash
    php artisan migrate
    ```