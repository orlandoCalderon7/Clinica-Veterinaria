# ClinicaVeterinaria

Este proyecto fue generado por [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

# Sistema de Gestión Veterinaria
[Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-Module--based-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Material Icons](https://img.shields.io/badge/Material_Icons-Round-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow?style=for-the-badge)

> Aplicación web de gestión clínica veterinaria desarrollada con **Angular 17**,
> arquitectura modular por features, servicios reactivos con RxJS y UI construida
> íntegramente con **Material Icons Round** y **SCSS** personalizado.

## Descripción General

Es un sistema de gestión para clínicas veterinarias que permite
administrar pacientes (mascotas), sus dueños, y la agenda de citas médicas.

La aplicación fue diseñada con un enfoque **modular y escalable**, separando
responsabilidades por dominio (features), con una capa de servicios reactivos
que centraliza el estado de cada entidad.

### Funcionalidades implementadas

| Módulo | Funcionalidades |
|---|---|
| **Mascotas** | Registro, edición, listado y baja de pacientes |
| **Citas** | Calendario mensual, agenda diaria, creación, edición y cancelación de citas |
| **Dueños** | Registro y asociación de dueños a mascotas |
| **UI Global** | Sidebar, modal global, navegación reactiva |

## Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| **Angular** | 19.x | Framework principal (SPA) |
| **TypeScript** | 5.x | Tipado estático en toda la app |
| **RxJS** | 7.x | Estado reactivo con `BehaviorSubject` |
| **Angular Reactive Forms** | — | Formularios con validación en tiempo real |
| **SCSS** | — | Estilos modulares por componente |
| **Material Icons Round** | CDN Google | Iconografía consistente en toda la UI |
| **Angular CLI** | 19.x | Scaffolding, build y dev server |

### Dependencia de iconos (CDN)
Incluida en `index.html`:

<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
      rel="stylesheet" />

## Servidor de desarrollo

Ejecuta `npx ng serve` para iniciar un servidor de desarrollo. Accede a `http://localhost:4200/`. La aplicación se recargará automáticamente si modificas alguno de los archivos fuente

## Code scaffolding

Ejecuta `ng generate component component-name` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`

## Build

Ejecuta `ng build` para compilar el proyecto. Los archivos de compilación se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Ejecución de pruebas de extremo a extremo

Ejecuta `ng e2e` para realizar las pruebas de extremo a extremo en la plataforma que prefieras. Para usar este comando, primero debes agregar un paquete que implemente las capacidades de pruebas de extremo a extremo.

## Más ayuda

Para obtener más ayuda sobre Angular CLI, utilice `ng help` o consulte la página [Descripción general y referencia de comandos de Angular CLI](https://angular.io/cli).


## Instalación y Ejecución

Requisitos previos

**Node.js** >= 18.x

**Angular CLI** >= 19.x

npm install -g @angular/cli

**Clonar Repositorio**
git clone https://github.com/orlandoCalderon7/Clinica-Veterinaria

Instalar dependencias **npm install**

Ejecucuión de Desarrollo

**npx ng serve**

## Grupo 3

Desarrollado como sistema de gestión veterinaria con Angular 19, por alumnos del 4to ciclo de Gestión de Sistemas de Información - Zegel en Interfases 3.

Con su arquitectura, componentes, servicios y UI diseñados de forma incremental con enfoque en escalabilidad y consistencia visual.

