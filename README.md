# OctoFront

---

<p>
  <img src="https://img.shields.io/github/v/tag/carscx/octofront?label=version&sort=semver" alt="version">&nbsp;&nbsp;
  <img src="https://img.shields.io/github/license/carscx/octofront.svg" alt="License">&nbsp;&nbsp;
  <img src="https://img.shields.io/github/last-commit/carscx/octofront.svg" alt="Last Commit">&nbsp;&nbsp;
  <img src="https://img.shields.io/github/issues/carscx/octofront.svg" alt="GitHub issues">&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/platform-Node.js-brightgreen.svg" alt="Platform">&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/node-20.9.0-brightgreen.svg" alt="Node Version">
</p>

---
Welcome to the OctoFront project! This is a frontend project designed to interact with OctoPrint, allowing users to easily and efficiently monitor and control their 3D printer.

> **⚠️ Notice:** This project is under active development and is constantly evolving. Some features may change or not be fully implemented. We are continuously working to improve and add new features!

> **⚠️ Aviso:** Este proyecto está en desarrollo activo y evoluciona constantemente. Algunas funcionalidades pueden cambiar o no estar completamente implementadas. ¡Estamos trabajando para mejorar y agregar nuevas características continuamente!

## Description

OctoFront is a web application developed with React, TypeScript, and Vite, focused on providing a modern, clean, and accessible interface for OctoPrint users. This frontend is designed for users who prefer a simplified experience, showing only the most important data from the 3D printer, such as:

- **Temperature**: Real-time visualization of the hotend and bed temperature, with the option to set new temperatures.
- **Printer status**: Monitoring the current status of the printer, such as whether it is idle, printing, or has completed a task.
- **File status in print**: Information about the file being printed, including the progress of the print.
- **Responsive interface**: Compatible with mobile and desktop devices, adapting to any screen size.
- **Multilingual support**: Support for multiple languages, allowing users to use the application in their preferred language.
- **Customizable themes**: Users can choose between a light theme and a dark theme, offering a personalized experience.

This project is ideal for those who do not need the full range of functionalities that OctoPrint offers but prefer a quick and simplified view of the key elements.

## Features

1. Modern and clean interface
2. Responsive and adaptive
3. Multilingual support
4. Light and dark themes
5. Hotend and bed temperature control
6. Real-time printer status
7. Progress of the ongoing print

## Installation

To install and run this project locally, follow these steps:

**1. Clone the repository:**

```bash
git clone https://github.com/carscx/octofront.git
cd octofront
```

**2. Install dependencies:**

```bash
yarn install
yarn dev
```

**3. Set up environment variables:**

Create a .env file in the root of the project with the following environment variables:

```
VITE_API_KEY_OCTOPRINT=YOUR_API_KEY
VITE_WEBSOCKET_URL_OCTOPRINT=ws://YOUR_OCTOPRINT_IP
VITE_API_URL_OCTOPRINT=http://YOUR_OCTOPRINT_IP/api
VITE_WEBCAM_URL_OCTOPRINT=http://YOUR_OCTOPRINT_IP/webcam/?action=stream
```

**4. Run the application:**

```bash
yarn dev
```

The application will be available at http://localhost:5173.

## Contributions

This is an open-source project and is open to the community. If you have any suggestions, ideas, or improvements, feel free to open an issue or submit a pull request. Your collaboration is greatly appreciated.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

If you have any questions or need more information, you can contact the project maintainer at [karscx@gmail.com](mailto:karscx@gmail.com 'karscx@gmail.com').

---

Versión en español:

---

# OctoFront

¡Bienvenido al proyecto OctoFront! Este es un proyecto de frontend diseñado para interactuar con OctoPrint, permitiendo a los usuarios visualizar y controlar su impresora 3D de manera fácil y eficiente.

## Descripción

OctoFront es una aplicación web desarrollada con React, TypeScript y Vite, enfocada en proporcionar una interfaz moderna, limpia y accesible para los usuarios de OctoPrint. Este frontend está diseñado para aquellos usuarios que desean una experiencia simplificada, donde solo se muestren los datos más importantes de la impresora 3D, como

- **Temperatura**: Visualización en tiempo real de la temperatura del hotend y la cama, con la opción de establecer nuevas temperaturas.
- **Estado de la impresora**: Monitorización del estado actual de la impresora, como si está en reposo, en proceso de impresión, o ha finalizado una tarea.
- **Estado del archivo en impresión**: Información sobre el archivo que se está imprimiendo, incluyendo el progreso de la impresión.
- **Interfaz responsive**: Compatible con dispositivos móviles y de escritorio, adaptándose a cualquier tamaño de pantalla.
- **Multiidioma**: Soporte para varios idiomas, lo que permite a los usuarios utilizar la aplicación en su idioma preferido.
- **Temas personalizables**: Los usuarios pueden elegir entre un tema claro y un tema oscuro, ofreciendo una experiencia personalizada.

Este proyecto es ideal para aquellos que no necesitan la gama completa de funcionalidades que ofrece OctoPrint, sino que prefieren una vista rápida y simplificada de los elementos clave.

## Características

1. Interfaz moderna y limpia
2. Responsive y adaptativa
3. Soporte multiidioma
4. Tema claro y oscuro
5. Configuración de temperatura del hotend y cama
6. Estado de la impresora en tiempo real
7. Progreso de la impresión en curso

## Instalación

Para instalar y ejecutar este proyecto localmente, sigue estos pasos

**1. Clona el repositorio**

```bash
git clone https://github.com/carscx/octofront.git
cd octofront
```

**2. Instala las dependencias**

```bash
yarn install
yarn dev
```

**3. Configura las variables de entorno**

Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno

```
VITE_API_KEY_OCTOPRINT=YOUR_API_KEY
VITE_WEBSOCKET_URL_OCTOPRINT=ws://YOUR_OCTOPRINT_IP
VITE_API_URL_OCTOPRINT=http://YOUR_OCTOPRINT_IP/api
VITE_WEBCAM_URL_OCTOPRINT=http://YOUR_OCTOPRINT_IP/webcam/?action=stream
```

**4. Ejecuta la aplicación**

```bash
yarn dev
```

La aplicación estará disponible en http://localhost:5173.

## Contribuciones

Este es un proyecto de código abierto y está abierto a la comunidad. Si tienes alguna sugerencia, idea o mejora, no dudes en abrir un issue o enviar un pull request. Tu colaboración es muy apreciada.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto

Si tienes alguna pregunta o necesitas más información, puedes contactar con el mantenedor del proyecto a través de [karscx@gmail.com](mailto:karscx@gmail.com 'karscx@gmail.com').
