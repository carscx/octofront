# Step-by-Step Guide for Adding a New Language to OctoFront

_English Version_

## Create a Localization File:

In the **src/i18n** folder of octofront, create a new JSON file for the language you want to add. The file should follow the naming convention `xx.json`, where xx is the language code (e.g., `fr.json` for French). The structure of the JSON should follow the format of your existing localization files.

**Example:**

```json
{
  "common": {
    "statePrinter": "État de l'imprimante"
    // ...all keys of other languages view es.json for example
  }
}
```

## Add Language Entry in languages.json:

Open the `languages.json` file located in the i18n folder of OctoFront and add a new entry for the language you want to add. Make sure to include the `code, codeCountry, name, and flag` properties.

**Example:**

```json
{
  "code": "fr",
  "codeCountry": "fr-FR",
  "name": "Français",
  "flag": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
}
```

## Import the New Localization File in i18n/config.ts:

Open the `config.ts` file and import the newly created JSON file at the top of the file, just like the other languages.

**Example:**

```javascript
import frJSON from '@/locales/fr.json'
```

**Add the Language to the Resources Object:**

In the same `config.ts` file, add the newly imported language file to the resources object.

**Example:**

```javascript
const resources: { [key: string]: any } = {
  en: { common: enJSON },
  es: { common: esJSON },
  fr: { common: frJSON }, // Add the new language here
}
```

**Test the New Language:**

Run your application and test the new language by selecting it from your language selector component. Ensure that the translations are correctly applied throughout your app.

---

_Versión en Español_

---

# Guía Paso a Paso para Agregar un Nuevo Idioma al Sistema

## Crear un Archivo de Localización:

En la carpeta **src/i18n** de tu proyecto, crea un nuevo archivo JSON para el idioma que deseas agregar. El archivo debe seguir la convención de nombres `xx.json`, donde xx es el código del idioma (por ejemplo, `fr.json` para francés). La estructura del JSON debe seguir el formato de tus archivos de localización existentes.

**Ejemplo:**

```json
{
  "common": {
    "statePrinter": "État de l'imprimante"
    // ...todas las keys de otros idiomas, ver es.json para un ejemplo
  }
}
```

## Agregar Entrada de Idioma en languages.json:

Abre el archivo `languages.json` ubicado en la raíz de tu proyecto y agrega una nueva entrada para el idioma que deseas agregar. Asegúrate de incluir las propiedades `code, codeCountry, name, y flag`.

**Ejemplo:**

```json
{
  "code": "fr",
  "codeCountry": "fr-FR",
  "name": "Français",
  "flag": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
}
```

## Importar el Nuevo Archivo de Localización en i18n/config.ts:

Abre el archivo `config.ts` e importa el archivo JSON recién creado en la parte superior del archivo, tal como se hace con los otros idiomas.

**Ejemplo:**

typescript
Copiar código
import frJSON from '@/locales/fr.json'
Agregar el Idioma al Objeto de Recursos:
En el mismo archivo i18n.ts, agrega el archivo de idioma recién importado al objeto resources.

**Ejemplo:**

```javascript
const resources: { [key: string]: any } = {
  en: { common: enJSON },
  es: { common: esJSON },
  fr: { common: frJSON }, // Agrega el nuevo idioma aquí
}
```

**Probar el Nuevo Idioma:**
Ejecuta tu aplicación y prueba el nuevo idioma seleccionándolo desde el componente selector de idiomas. Asegúrate de que las traducciones se apliquen correctamente en toda la aplicación.
