<script setup>
import { onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import "@/assets/js/login-script";

const body = document.getElementsByTagName("body")[0];
const store = useStore();
onMounted(() => {
  store.state.isAbsolute = true;
  body.classList.remove("bg-gray-100");
});

onUnmounted(() => {
  body.classList.add("bg-gray-100");
});
</script>
<template>
  <div class="config-bar">
    <h3 class="config-title">Panel de Configuración</h3>
    <div class="config-actions">
      <button class="config-btn" id="saveConfigBtn">
        <i class="fas fa-save"></i> Guardar
      </button>
      <button class="config-btn" id="exportConfigBtn">
        <i class="fas fa-download"></i> Exportar
      </button>
      <a href="index.html" class="config-btn back-to-home">
        <i class="fa fa-arrow-left"></i> Volver al Inicio
      </a>
    </div>
  </div>

  <!-- Left sidebar: solo control de colores y fuentes -->
  <div class="color-sidebar">
    <h4 class="sidebar-title">Personalizar Apariencia</h4>

    <div class="color-control">
      <div class="color-label">Color 1</div>
      <input type="color" class="color-input" id="headerColor" value="#28a745" />
      <div class="color-preview">
        <div
          id="headerPreview"
          class="color-square-preview"
          style="background-color: #28a745;"
        ></div>
        <div class="color-hex" id="headerHex">#28a745</div>
      </div>
    </div>

    <div class="color-control">
      <div class="color-label">Color 2</div>
      <input type="color" class="color-input" id="buttonColor" value="#198754" />
      <div class="color-preview">
        <div
          id="buttonPreview"
          class="color-square-preview"
          style="background-color: #198754;"
        ></div>
        <div class="color-hex" id="buttonHex">#198754</div>
      </div>
    </div>

    <div class="color-control">
      <div class="color-label">Color 3</div>
      <input type="color" class="color-input" id="bgColor" value="#f8f9fa" />
      <div class="color-preview">
        <div
          id="bgPreview"
          class="color-square-preview"
          style="background-color: #f8f9fa;"
        ></div>
        <div class="color-hex" id="bgHex">#f8f9fa</div>
      </div>
    </div>

    <div class="color-control">
      <div class="color-label">Color 4</div>
      <input type="color" class="color-input" id="textColor" value="#333333" />
      <div class="color-preview">
        <div
          id="textPreview"
          class="color-square-preview"
          style="background-color: #333333;"
        ></div>
        <div class="color-hex" id="textHex">#333333</div>
      </div>
    </div>

    <div class="color-control">
      <div class="color-label">Color 5</div>
      <input type="color" class="color-input" id="titleColor" value="#212529" />
      <div class="color-preview">
        <div
          id="titlePreview"
          class="color-square-preview"
          style="background-color: #212529;"
        ></div>
        <div class="color-hex" id="titleHex">#212529</div>
      </div>
    </div>

    <button class="reset-btn" id="resetAll">
      <i class="fas fa-undo"></i> Restablecer Todo
    </button>
  </div>

  <!-- Right sidebar for saved configurations -->
  <div class="configs-sidebar">
    <div class="config-management">
      <h5 class="config-management-title">Gestión de Configuraciones</h5>
      <div class="config-management-buttons">
        <button class="config-management-btn success" id="saveAsConfigBtn">
          <i class="fas fa-save"></i> Guardar Como...
        </button>
        <button class="config-management-btn" id="exportConfigBtnSidebar">
          <i class="fas fa-download"></i> Exportar Configuración
        </button>
      </div>

      <div class="configs-header">
        <h6 class="configs-title">Mis Configuraciones</h6>
        <span class="configs-count" id="configsCount">0 guardadas</span>
      </div>

      <div class="search-box">
        <input
          type="text"
          class="search-input"
          id="searchConfigs"
          placeholder="Buscar configuraciones..."
        />
      </div>

      <div class="configs-list" id="configsList">
        <div class="empty-configs">No hay configuraciones guardadas</div>
      </div>
    </div>
  </div>

  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div class="login-container">
      <div class="login-card texto-personalizable">
        <div class="login-header">
          <h1 class="brand-title">Zay Shop</h1>
          <p class="welcome-text">Bienvenido de nuevo</p>
        </div>
        <div class="login-body">
          <form id="loginForm">
            <div class="mb-3">
              <label for="email" class="form-label">Correo electrónico</label>
              <input type="email" class="form-control" id="email" required />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="password" required />
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="remember" />
              <label class="form-check-label" for="remember">Recordarme</label>
            </div>
            <button type="submit" class="btn btn-login">Iniciar Sesión</button>
            <div class="text-center mt-3">
              <a href="#" class="text-decoration-none" style="color: var(--header-color);"
                >¿Olvidaste tu contraseña?</a
              >
            </div>
            <div class="text-center mt-3">
              <p>
                ¿No tienes una cuenta?
                <a href="#" class="text-decoration-none" style="color: var(--header-color);"
                  >Regístrate</a
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  <!-- Modal para guardar configuración -->
  <div class="modal-overlay" id="saveModal">
    <div class="modal-content">
      <h3 class="modal-title">Guardar Configuración</h3>
      <input
        type="text"
        class="modal-input"
        id="configName"
        placeholder="Nombre de la configuración"
        maxlength="30"
      />
      <div class="modal-actions">
        <button class="modal-btn secondary" id="cancelSave">Cancelar</button>
        <button class="modal-btn primary" id="confirmSave">Guardar</button>
      </div>
    </div>
  </div>

  <!-- Menú contextual para eliminar configuraciones -->
  <div class="context-menu" id="contextMenu">
    <div class="context-menu-item delete" id="contextMenuDelete">
      <i class="fas fa-trash"></i> Eliminar
    </div>
  </div>

  <!-- Notificaciones -->
  <div id="notification" class="notification"></div>
</template>

<style>
/* Variables CSS (Adaptadas del código proporcionado) */
:root {
  --header-color: #28a745;
  --button-color: #198754;
  --bg-color: #f8f9fa;
  --text-color: #333333;
  --title-color: #212529;
  /* Variables para personalización de texto */
  --local-font-size: 1em;
  --local-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --local-title-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --local-primary-font-size: 16px; /* Default for primary font size */
  --local-secondary-font-size: 16px; /* Default for secondary font size */
}

html,
body {
  height: 100%;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  transition: all 0.3s ease;
  margin: 0;
  padding: 0;
}

/* Aplicar color de texto y fuente a todos los elementos */
* {
  color: var(--text-color);
  font-size: inherit;
}

/* Aplicar color de títulos a elementos de encabezado */
/* EXCLUIR sidebar y config-bar de la fuente secundaria */
h1:not(.color-sidebar h1):not(.color-sidebar h2):not(.color-sidebar h3):not(.color-sidebar h4):not(.color-sidebar h5):not(.color-sidebar h6):not(.config-bar h1):not(.config-bar h2):not(.config-bar h3):not(.config-bar h4):not(.config-bar h5):not(.config-bar h6),
h2:not(.color-sidebar h1):not(.color-sidebar h2):not(.color-sidebar h3):not(.color-sidebar h4):not(.color-sidebar h5):not(.color-sidebar h6):not(.config-bar h1):not(.config-bar h2):not(.config-bar h3):not(.config-bar h4):not(.config-bar h5):not(.config-bar h6),
h3:not(.color-sidebar h1):not(.color-sidebar h2):not(.color-sidebar h3):not(.color-sidebar h4):not(.color-sidebar h5):not(.color-sidebar h6):not(.config-bar h1):not(.config-bar h2):not(.config-bar h3):not(.config-bar h4):not(.config-bar h5):not(.config-bar h6),
h4:not(.color-sidebar h1):not(.color-sidebar h2):not(.color-sidebar h3):not(.color-sidebar h4):not(.color-sidebar h5):not(.color-sidebar h6):not(.config-bar h1):not(.config-bar h2):not(.config-bar h3):not(.config-bar h4):not(.config-bar h5):not(.config-bar h6),
h5:not(.color-sidebar h1):not(.color-sidebar h2):not(.color-sidebar h3):not(.color-sidebar h4):not(.color-sidebar h5):not(.color-sidebar h6):not(.config-bar h1):not(.config-bar h2):not(.config-bar h3):not(.config-bar h4):not(.config-bar h5):not(.config-bar h6),
h6:not(.color-sidebar h1):not(.color-sidebar h2):not(.color-sidebar h3):not(.color-sidebar h4):not(.color-sidebar h5):not(.color-sidebar h6):not(.config-bar h1):not(.config-bar h2):not(.config-bar h3):not(.config-bar h4):not(.config-bar h5):not(.config-bar h6) {
  color: var(--title-color);
  font-family: var(--local-title-font-family);
}

/* Barra de configuración superior - FUENTE FIJA */
.config-bar {
  background-color: white;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1100;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  font-size: 16px; /* Fixed font size for config bar */
}

.config-title {
  font-weight: 600;
  margin: 0;
  font-size: 1.2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
}

.config-actions {
  display: flex;
  gap: 10px;
}

.config-btn {
  background: none;
  border: 1px solid #dee2e6;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  font-size: 14px; /* Fixed font size for config buttons */
}

.config-btn:hover {
  background-color: #f8f9fa;
}

/* Sidebar Muy Extendido (Posición Fija a la Izquierda) - FUENTE FIJA */
.color-sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  height: calc(100vh - 60px);
  background: white;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  padding: 30px;
  z-index: 1000;
  width: 380px;
  overflow-y: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  font-size: 16px; /* Fixed font size for sidebar */
}

.color-sidebar * {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  font-size: 14px; /* Fixed font size for all elements within sidebar */
}

.color-control {
  margin-bottom: 25px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.color-label {
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
}

.color-input {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.color-preview {
  display: flex;
  margin-top: 12px;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
}

.color-square-preview {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.color-hex {
  font-weight: 600;
  font-size: 15px;
}

.back-to-home {
  color: var(--header-color) !important;
  text-decoration: none;
  font-weight: 500;
}

.back-to-home:hover {
  text-decoration: underline;
}

.reset-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s;
  font-weight: 600;
  font-size: 16px;
}

.reset-btn:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

.sidebar-title {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
  border-bottom: 3px solid #eee;
  padding-bottom: 20px;
  font-size: 1.5rem;
  color: var(--title-color) !important;
}

.brand-title {
  color: var(--title-color) !important;
  font-weight: 700;
  margin-bottom: 5px;
}

.welcome-text {
  color: var(--text-color);
  font-size: 0.9rem;
  opacity: 0.8;
}

/* TEXTO LOCAL (aplicado a elementos personalizables dentro de login-card) */
.login-card.texto-personalizable, .login-card.texto-personalizable * {
  font-family: var(--local-font-family) !important;
  font-size: var(--local-primary-font-size) !important; /* Use primary font size for all elements */
}

.login-card.texto-personalizable p,
.login-card.texto-personalizable label,
.login-card.texto-personalizable a,
.login-card.texto-personalizable .form-control,
.login-card.texto-personalizable .btn-login {
  font-family: var(--local-font-family) !important;
  font-size: var(--local-primary-font-size) !important; /* Ensure these also use primary font size */
}

/* Aplicar fuente secundaria a títulos dentro de login-card */
.login-card.texto-personalizable h1,
.login-card.texto-personalizable h2,
.login-card.texto-personalizable h3,
.login-card.texto-personalizable h4,
.login-card.texto-personalizable h5,
.login-card.texto-personalizable h6 {
  font-family: var(--local-title-font-family) !important;
  font-size: var(--local-secondary-font-size) !important; /* Use secondary font size for titles */
}

/* Keep constant layout size for inputs and buttons within the login card */
.login-card.texto-personalizable .form-control,
.login-card.texto-personalizable .btn-login {
  font-size: 1rem !important;
}

.option-group {
  margin-bottom: 20px;
}

.option-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}

.option-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  background: white;
}

/* Estilos para la gestión de configuraciones */
.config-management {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.config-management-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.config-management-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.config-management-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 500;
}

.config-management-btn:hover {
  background-color: #0069d9;
}

.config-management-btn.secondary {
  background-color: #6c757d;
}

.config-management-btn.secondary:hover {
  background-color: #5a6268;
}

.config-management-btn.success {
  background-color: #28a745;
}

.config-management-btn.success:hover {
  background-color: #218838;
}

/* Estilos para notificaciones */
.notification {
  position: fixed;
  top: 80px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  z-index: 1200;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateX(400px);
  transition: transform 0.3s ease;
}

.notification.show {
  transform: translateX(0);
}

.notification.success {
  background-color: #28a745;
}

.notification.error {
  background-color: #dc3545;
}

.notification.info {
  background-color: #17a2b8;
}

/* Estilos para la lista de configuraciones */
.configs-list {
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  padding: 10px;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
  transition: background-color 0.2s;
  cursor: pointer;
}

.config-item:hover {
  background-color: #f8f9fa;
}

.config-item:last-child {
  border-bottom: none;
}

.config-item-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column; /* Stack name and date */
  gap: 2px;
}

.config-item-colors {
  display: flex;
  gap: 4px;
  margin-right: 10px;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ddd;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.config-item-name {
  font-weight: 600;
  margin-bottom: 0px; /* Adjusted to remove extra margin */
}

.config-item-date {
  font-size: 0.8rem;
  color: #6c757d;
}

.config-item-actions {
  display: flex;
  gap: 5px;
}

.config-item-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.config-item-btn:hover {
  background-color: #e9ecef;
}

.config-item-btn.delete {
  color: #dc3545;
}

.empty-configs {
  text-align: center;
  padding: 20px;
  color: #6c757d;
  font-style: italic;
}

.search-box {
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

.configs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.configs-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.configs-count {
  font-size: 0.8rem;
  color: #6c757d;
}

/* Modal para guardar configuración */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.modal-overlay.show {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 25px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(-20px);
  transition: transform 0.3s;
}

.modal-overlay.show .modal-content {
  transform: translateY(0);
}

.modal-title {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.modal-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-bottom: 15px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
}

.modal-btn.primary {
  background-color: #007bff;
  color: white;
}

.modal-btn.secondary {
  background-color: #6c757d;
  color: white;
}

.config-item-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.config-item-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.font-preview {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 2px;
}

/* Menú contextual para eliminar configuraciones */
.context-menu {
  position: fixed;
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1400;
  min-width: 150px;
  display: none;
}

.context-menu.show {
  display: block;
}

.context-menu-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.context-menu-item:hover {
  background-color: #f8f9fa;
}

.context-menu-item.delete {
  color: #dc3545;
}

.context-menu-item i {
  margin-right: 8px;
  width: 16px;
}

/* Right sidebar for saved configurations */
.configs-sidebar {
  position: fixed;
  top: 60px;
  right: 0;
  bottom: 0;
  width: 300px;
  background: white;
  box-shadow: -2px 0 10px rgba(0,0,0,0.06);
  padding: 20px;
  z-index: 1000;
  overflow-y: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
}

/* Main content area to make space for both sidebars */
.main-content {
  background-color: var(--bg-color); /* Ensure background changes with color */
  min-height: calc(100vh - 60px); /* Adjust for config bar height */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 60px; /* Height of .config-bar */
  margin-left: 380px; /* Width of .color-sidebar */
  margin-right: 300px; /* Width of .configs-sidebar */
  width: calc(100% - 380px - 300px); /* Remaining width */
}

/* Login container styles */
.login-container {
  min-height: calc(100vh - 60px); /* Adjust for config bar height */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-left: 0; /* Handled by .main-content */
  margin-right: 0; /* Handled by .main-content */
  margin-top: 0; /* Handled by .main-content */
  width: 100%; /* Occupy full width within main-content */
  background-color: var(--bg-color); /* Ensure background changes with color */
}

/* Login card original styles */
.login-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.login-header {
  background-color: white;
  padding: 25px;
  text-align: center;
  transition: background-color 0.3s ease;
  border-bottom: 5px solid var(--header-color);
}

.login-body {
  padding: 30px;
}

.form-control {
  border: 1px solid #dee2e6;
  padding: 12px 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.btn-login {
  background-color: var(--button-color);
  border: none;
  color: white;
  padding: 12px 15px;
  width: 100%;
  font-weight: 500;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-login:hover {
  filter: brightness(0.95);
}

#loginForm {
  margin-top: 0; /* Resetting to default, adjust if needed */
}
</style>

