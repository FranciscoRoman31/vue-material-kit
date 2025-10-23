# Sistema de Configuración Global

Este sistema permite que las configuraciones de colores, tipografía y tamaños de fuente se apliquen a toda la aplicación de manera persistente.

## Características

- ✅ **Persistencia**: Las configuraciones se guardan en localStorage
- ✅ **Aplicación Global**: Se aplican a todas las vistas del proyecto
- ✅ **Tiempo Real**: Los cambios se reflejan inmediatamente
- ✅ **Tipografía**: Control de fuentes y tamaños para títulos y párrafos
- ✅ **Colores**: Control completo de la paleta de colores

## Archivos Creados

### 1. `src/utils/globalConfig.js`
Sistema principal de configuración que maneja:
- Carga y guardado de configuraciones
- Aplicación de variables CSS
- Persistencia en localStorage

### 2. `src/composables/useGlobalConfig.js`
Composable de Vue para usar en componentes:
```javascript
import { useGlobalConfig } from '@/composables/useGlobalConfig.js';

const { config, updateColors, updateTypography, resetConfig } = useGlobalConfig();
```

### 3. `src/assets/css/global-config.css`
CSS global que aplica las configuraciones a toda la aplicación.

## Uso en Componentes

### Opción 1: Usar el Composable
```vue
<script setup>
import { useGlobalConfig } from '@/composables/useGlobalConfig.js';

const { config, updateColors, updateTypography } = useGlobalConfig();

// Actualizar colores
updateColors({
  header: '#ff0000',
  button: '#00ff00'
});

// Actualizar tipografía
updateTypography({
  paragraphFont: 'Arial, sans-serif',
  paragraphSize: '18px'
});
</script>
```

### Opción 2: Usar la Instancia Global
```javascript
// Acceder a la configuración global
const config = window.globalConfig.getConfig();

// Actualizar configuración
window.globalConfig.updateColors({ header: '#ff0000' });
window.globalConfig.updateTypography({ paragraphFont: 'Arial' });
```

## Variables CSS Disponibles

```css
:root {
  --header-color: #28a745;
  --button-color: #198754;
  --bg-color: #f8f9fa;
  --text-color: #333333;
  --title-color: #212529;
  --paragraph-font-family: 'Segoe UI', sans-serif;
  --paragraph-font-size: 16px;
  --title-font-family: 'Segoe UI', sans-serif;
  --title-font-size: 20px;
}
```

## Aplicación Automática

El sistema aplica automáticamente las configuraciones a:

- **Títulos**: h1, h2, h3, h4, h5, h6, .title, .heading
- **Párrafos**: p, span, div, label, a, li
- **Botones**: .btn, .button, button
- **Enlaces**: a, .link, .nav-link
- **Formularios**: input, textarea, select
- **Navegación**: .navbar, .header
- **Cards**: .card, .container

## Configuración Inicial

Las configuraciones se cargan automáticamente al iniciar la aplicación en `main.js`:

```javascript
import globalConfig from "./utils/globalConfig.js";
import "./assets/css/global-config.css";
```

## Persistencia

Las configuraciones se guardan automáticamente en localStorage con la clave `globalAppConfig` y se restauran al recargar la página.

## Ejemplo de Uso Completo

```vue
<template>
  <div class="my-component">
    <h1 class="my-title">Mi Título</h1>
    <p class="my-content">Mi contenido</p>
    <button class="my-button">Mi Botón</button>
  </div>
</template>

<script setup>
import { useGlobalConfig } from '@/composables/useGlobalConfig.js';

const { config } = useGlobalConfig();

// Las clases usarán automáticamente las configuraciones globales
</script>

<style scoped>
.my-title {
  /* Usará automáticamente --title-font-family y --title-font-size */
  color: var(--title-color);
}

.my-content {
  /* Usará automáticamente --paragraph-font-family y --paragraph-font-size */
  color: var(--text-color);
}

.my-button {
  /* Usará automáticamente --button-color */
  background-color: var(--button-color);
}
</style>
```

## Beneficios

1. **Consistencia**: Todas las vistas mantienen el mismo estilo
2. **Facilidad**: Cambios centralizados desde un solo lugar
3. **Persistencia**: Las configuraciones se mantienen entre sesiones
4. **Escalabilidad**: Fácil agregar nuevas configuraciones
5. **Mantenibilidad**: Código organizado y reutilizable

