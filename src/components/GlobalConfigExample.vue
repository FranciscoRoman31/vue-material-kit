<template>
  <div class="global-config-example">
    <h1 class="example-title">Ejemplo de Configuración Global</h1>
    <p class="example-description">
      Este componente muestra cómo las configuraciones globales se aplican automáticamente.
    </p>
    
    <div class="example-card">
      <h2 class="card-title">Título de Tarjeta</h2>
      <p class="card-content">
        Este contenido usa la tipografía y colores configurados globalmente.
        Los cambios que hagas en el panel de configuración se aplicarán aquí automáticamente.
      </p>
      <button class="example-button">Botón de Ejemplo</button>
    </div>
    
    <div class="example-list">
      <h3 class="list-title">Lista de Ejemplo</h3>
      <ul>
        <li>Elemento 1 con tipografía configurada</li>
        <li>Elemento 2 con colores personalizados</li>
        <li>Elemento 3 que responde a los cambios</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useGlobalConfig } from '@/composables/useGlobalConfig.js';

// Usar la configuración global
const { config } = useGlobalConfig();
</script>

<style scoped>
.global-config-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.example-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin: 20px 0;
  border-left: 4px solid var(--header-color);
}

.example-button {
  background-color: var(--button-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.example-button:hover {
  background-color: var(--header-color);
  transform: translateY(-2px);
}

.example-list {
  margin-top: 20px;
}

.list-title {
  color: var(--title-color);
  margin-bottom: 15px;
}
</style>

