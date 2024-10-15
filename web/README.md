# BE - Prueba Técnica Intelimotor

**Desarrollada por Eric Montes de Oca Juárez**

## Descripción

Esta carpeta `web` es la encargada de generar una aplicación FE, que debe ser construida usando React, Material UI y debe consumir al API del BE, el resultado de la ejecución es que la captura de pantalla del anuncio generado debe ser visible para el usuario.

## Estructura del proyecto

Para satisfacer las necesidades del proyecto y con la finalidad de hacer un proyecto lo más escalable posible a futuro, así cómo respetar buenas prácticas la estructura del proyecto quedó definida de la siguiente manera:

- `src` -> Contiene los archivos .tsx que conforman la aplicación
  - `components` -> Contiene los componentes de la aplicación
  - `App.tsx` -> Es el entrypoint a la aplicación, contiene la definición de rutas de React Router, así como el árbol de componentes de la aplicación.
- `public` -> Contiene el favicon de la aplicación.

## Dependencias

El proyecto hace uso de los siguientes paquetes:

- React.js
- React Router
- Vite
- TypeScript
- Eslint
- Prettier

Para instalar los paquetes usar el siguiente comando:

```
npm install
```

## Configuración del ambiente

Para configurar la aplicación es necesario crear un archivo `.env`. Las variables necesarias para iniciar el proyecto se pueden copiar del archivo `.env.example`

```
VITE_API_URL= Añadir la URL de la API incluyendo puerto, ejemplo: http://localhost:3000
```

`VITE_API_URL` hace referencia a la URL del servidor, debe incluir el número de puerto.

## Iniciar app

Para iniciar la app, es necesario ejecutar el siguiente comando desde la carpeta `/api`:

```
npm run start
```

## Publicar anuncio en seminuevos.com

Para publicar un anuncio de vehículo en `seminuevos.com`
hay que entrar a la ruta `/`.

Los datos requeridos para poder enviar la solicitud al backend son:

- Precio: number
- Descripción: string

Una vez que se hace submit al formulario, se podrá observar un loader que indica al usuarios que el anuncio se está publicando.

Si todo sale bien, habrá una redirección a `/ad/:advertisementID` donde podremos ver la captura de pantalla del anuncio generado.

En caso de fallo, aparecerá un modal indicando el error que ha ocurrido en el BE. Al cerrar el modal podemos volver a intentar publicar un nuevo anuncio.
