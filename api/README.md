# BE - Prueba Técnica Intelimotor

**Desarrollada por Eric Montes de Oca Juárez**

## Descripción

Esta carpeta `api` es la encargada de generar un API usando Node.JS, Express y Puppeteer para hacer webscraping a `seminuevos.com` con la finalidad de publicar un anuncio de un vehículo en venta.

## Estructura del proyecto

Para satisfacer las necesidades del proyecto y con la finalidad de hacer un proyecto lo más escalable posible a futuro, así cómo respetar buenas prácticas la estructura del proyecto quedó definida de la siguiente manera:

- `src` -> Tiene todo el código del BE
  - `controllers` -> Encargado de mantener los controladores de la aplicación
  - `routes` -> Contiene las rutas del proyecto
  - `services` -> Contiene la lógica del negocio
  - `utils` -> Contiene funciones o módulos reutilizables
  - `index.ts` -> Es el entrypoint a la aplicación, contiene el servidor de Express.
- `generated` -> Contiene archivos generados, en este caso se empleó para almacenar las capturas de pantalla generadas tras publicar el anuncio.
  - `screenshots`
- `public` -> Contiene las imagenes que se utilizan para generar el anuncio del vehículo
- `types` -> Contiene los tipos que se fueron generando para mantener control de la app usando TypeScript.

## Dependencias

El proyecto hace uso de los siguientes paquetes:

- Node.js
- Express.js
- Dotenv
- TypeScript
- Puppetter
- Eslint
- Prettier

Para instalar los paquetes usar el siguiente comando:

```
npm install
```

## Configuración del ambiente

Para configurar la aplicación es necesario crear un archivo `.env`. Las variables necesarias para iniciar el proyecto se pueden copiar del archivo `.env.example`

```
PORT='Set the preferred port for thr app to run'
SEMINUEVOS_USER='This value should be an email account already registed in seminuevos.com, else create one'
SEMINUEVOS_PASSWORD='This value should be the valid password that matches an email account already registed in seminuevos.com, else create one'
```

`PORT` hace referencia al puerto en el cual será iniciada la app. Si no se escoge un valor, por defecto se seleccionará el puerto 3000

Por otra parte, tanto `SEMINUEVOS_USER` y `SEMINUEVOS_PASSWORD` corresponder al usuario y contraseña de una cuenta de `seminuevos.com`. Si no se cuenta con una, será necesario crear una de manera manual accediendo a la siguiente [URL](https://admin.seminuevos.com/login).

## Iniciar app

Para iniciar la app, es necesario ejecutar el siguiente comando desde la carpeta `/api`:

```
npm run start
```

## Comenzar scrapping de seminuevos.com

Para iniciar el scrapping de `seminuevos.com`, se debe ejecutar el endpoint

```
Endpoint: api/scrape
Método: POST
Params: {
    inputPrecio: number
    inputDescription: string
}
Response: {
    httpStatus: 200,
    message: string,
    advertisementId: number,
    imageUrl: string
}
```
