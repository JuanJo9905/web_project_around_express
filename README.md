# Tripleten Web Project Around Express
Este proyecto utiliza Node.js y Express.js para crear una aplicación web. A continuación, se detallan las tecnologías y herramientas utilizadas, así como las instrucciones para configurar y ejecutar el proyecto.

Tecnologías Utilizadas
Node.js: Entorno de ejecución para JavaScript en el servidor.
Express.js: Framework para aplicaciones web en Node.js.
ESLint: Herramienta de validación de código para mantener la calidad del código.

Configuración del Proyecto
Clonar el repositorio:
  git clone https://github.com/JuanJo9905/web_project_around_express.git

Instalar dependencias:
npm install express@4.21.1 react@18.3.1 react-dom@18.3.1 && 
npm install --save-dev @eslint/js@9.12.0 eslint@8.57.1 eslint-config-airbnb-base@15.0.0 \
eslint-plugin-import@2.31.0 eslint-plugin-react@7.37.1 eslint-plugin-react-hooks@4.6.2 \
globals@15.11.0 nodemon@3.1.7

Configurar ESLint:
El proyecto utiliza un archivo de configuración para definir las reglas de validación de código.

Uso del Proyecto
Iniciar el servidor:
  npm start
Iniciar el servidor como desarollador y hot reload:
  nmp start dev

Rutas y Solicitudes HTTP:
El servidor está configurado para manejar varias rutas y solicitudes HTTP. Puedes modificar y añadir nuevas rutas en el archivo routes.js.
Obtención de Información:
La información se obtiene de archivos JSON que contienen colecciones de datos. Se utiliza fs.readFile para leer la información de estos archivos.

Autor
Juan José González Quintero.

