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

  <div class="color-sidebar">
    <h4 class="sidebar-title">Personalizar Apariencia</h4>

    <div class="color-control">
      <div class="color-label">Color 1</div>
      <input type="color" class="color-input" id="headerColor" value="#28a745" />
      <div class="color-preview">
        <div
          id="headerPreview"
          style="width: 30px; height: 30px; background-color: #28a745; border-radius: 6px;"
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
          style="width: 30px; height: 30px; background-color: #198754; border-radius: 6px;"
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
          style="width: 30px; height: 30px; background-color: #f8f9fa; border-radius: 6px; border: 1px solid #ddd;"
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
          style="width: 30px; height: 30px; background-color: #333333; border-radius: 6px;"
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
          style="width: 30px; height: 30px; background-color: #212529; border-radius: 6px;"
        ></div>
        <div class="color-hex" id="titleHex">#212529</div>
      </div>
    </div>

    <h4 class="sidebar-title mt-4">Personalizar Texto</h4>
    <div class="additional-options" style="border-top: none; margin-top: 0; padding-top: 0;">
      <div class="option-group">
        <label class="option-label">Tamaño de Fuente (Escala 0-100)</label>
        <input type="range" class="form-range" id="fontSizeRange" min="0" max="100" value="0" />
        <span id="fontSizeValue">0% (Tamaño base)</span>
      </div>

      <div class="option-group">
        <label class="option-label">Fuente Principal (Párrafos)</label>
        <select class="option-select" id="primaryFontSelect">
          <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" selected>
            Segoe UI (Defecto)
          </option>
          <option value="Roboto, sans-serif">Roboto</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="'Courier New', monospace">Courier New</option>
        </select>
      </div>

      <div class="option-group">
        <label class="option-label">Fuente Secundaria (Títulos)</label>
        <select class="option-select" id="secondaryFontSelect">
          <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" selected>
            Segoe UI (Defecto)
          </option>
          <option value="Roboto, sans-serif">Roboto</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="'Courier New', monospace">Courier New</option>
        </select>
      </div>
    </div>

    <!-- Sección para cargar fuentes TTF -->
    <div class="font-upload-section">
      <h5 class="font-upload-title">Cargar Fuentes Personalizadas</h5>

      <div class="font-upload-control">
        <label class="font-upload-label">Seleccionar archivo TTF</label>
        <input type="file" class="font-upload-input" id="fontFileInput" accept=".ttf" />
      </div>

      <div class="font-upload-control">
        <label class="font-upload-label">Nombre de la fuente</label>
        <input
          type="text"
          class="font-upload-input"
          id="fontNameInput"
          placeholder="Ingresa un nombre para la fuente"
        />
      </div>

      <button class="font-upload-btn" id="uploadFontBtn" disabled>
        <i class="fas fa-upload"></i> Cargar Fuente
      </button>

      <div class="font-preview-container">
        <div class="font-preview-box">
          <div class="font-preview-title" id="primaryFontPreviewTitle">
            Título Principal
          </div>
          <div class="font-preview-paragraph" id="primaryFontPreviewText">
            Texto de párrafo con fuente principal
          </div>
        </div>
        <div class="font-preview-box">
          <div class="font-preview-title" id="secondaryFontPreviewTitle">
            Título Secundario
          </div>
          <div class="font-preview-paragraph" id="secondaryFontPreviewText">
            Texto de párrafo con fuente secundaria
          </div>
        </div>
      </div>

      <div class="uploaded-fonts-list" id="uploadedFontsList">
        <div class="empty-fonts">No hay fuentes cargadas</div>
      </div>
    </div>

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

    <button class="reset-btn" id="resetAll">
      <i class="fas fa-undo"></i> Restablecer Todo
    </button>
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
  /* Variables para personalización de texto (Mantenidas de peticiones anteriores) */
  --local-font-size: 1em;
  --local-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --local-title-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

html,
body {
  height: 100%;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
  margin: 0;
  padding: 0;
}

/* Aplicar color de texto y fuente a todos los elementos */
* {
  color: var(--text-color);
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
  position: fixed; /* Asegura que la barra superior se quede fija */
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1100; /* Alto z-index para estar sobre el sidebar */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
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
}

.config-btn:hover {
  background-color: #f8f9fa;
}

/* Contenedor principal del Login: Centrado y debajo de la barra superior */
.login-container {
  /* 60px es la altura aproximada de .config-bar */
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  /* Margin para compensar el sidebar extendido */
  margin-left: 380px;
  margin-top: 60px; /* Separación de la barra superior fija */
  width: calc(100% - 380px); /* Ocupa el espacio restante */
}

.login-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
}

.login-header {
  background-color: white;
  padding: 25px;
  text-align: center;
  transition: background-color 0.3s ease;
  /* Usa la variable de color del header */
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
  /* Usa la variable de color del botón */
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
  /* Ajuste para el hover basado en la opacidad */
  background-color: var(--button-color);
  opacity: 0.9;
}

/* Sidebar Muy Extendido (Posición Fija a la Izquierda) - FUENTE FIJA */
.color-sidebar {
  position: fixed;
  top: 60px; /* Debajo de la barra de configuración */
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
}

.color-sidebar * {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
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

.color-hex {
  font-weight: 600;
  font-size: 15px;
}

.back-to-home {
  /* Usa la variable de color del header */
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
  /* Aseguramos que el color del título aplique aquí */
  color: var(--title-color) !important;
}

.brand-title {
  /* Aseguramos que el color del título aplique aquí */
  color: var(--title-color) !important;
  font-weight: 700;
  margin-bottom: 5px;
}

.welcome-text {
  color: var(--text-color);
  font-size: 0.9rem;
  opacity: 0.8;
}

/* TEXTO LOCAL (Funcionalidad de la petición anterior) */
/* Aplicamos la clase de personalización de texto al login-card */
.login-card.texto-personalizable,
.login-card.texto-personalizable * {
  font-family: var(--local-font-family) !important;
}

.login-card.texto-personalizable p,
.login-card.texto-personalizable label,
.login-card.texto-personalizable a,
.login-card.texto-personalizable .form-control,
.login-card.texto-personalizable .btn-login {
  font-family: var(--local-font-family) !important;
}

/* Solo aplicar fuente secundaria a títulos dentro del login-card */
.login-card.texto-personalizable h1,
.login-card.texto-personalizable h2,
.login-card.texto-personalizable h3,
.login-card.texto-personalizable h4,
.login-card.texto-personalizable h5,
.login-card.texto-personalizable h6 {
  font-family: var(--local-title-font-family) !important;
}

.login-card.texto-personalizable,
.login-card.texto-personalizable p,
.login-card.texto-personalizable h1,
.login-card.texto-personalizable h2,
.login-card.texto-personalizable label,
.login-card.texto-personalizable a,
.login-card.texto-personalizable h4 {
  font-size: var(--local-font-size) !important;
}

.login-card.texto-personalizable .form-control,
.login-card.texto-personalizable .btn-login {
  /* Mantenemos el tamaño de los inputs y botones de layout constante */
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
  align-items: center;
  gap: 10px;
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
  margin-bottom: 3px;
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

/* Estilos para la carga de fuentes TTF */
.font-upload-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.font-upload-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.font-upload-control {
  margin-bottom: 15px;
}

.font-upload-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.font-upload-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

.font-upload-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 500;
  width: 100%;
}

.font-upload-btn:hover {
  background-color: #0069d9;
}

.font-upload-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.uploaded-fonts-list {
  margin-top: 15px;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  padding: 10px;
}

.uploaded-font-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
}

.uploaded-font-item:hover {
  background-color: #f8f9fa;
}

.uploaded-font-item:last-child {
  border-bottom: none;
}

.uploaded-font-name {
  font-weight: 500;
}

.uploaded-font-date {
  font-size: 0.8rem;
  color: #6c757d;
}

.empty-fonts {
  text-align: center;
  padding: 10px;
  color: #6c757d;
  font-style: italic;
}

.font-preview-container {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.font-preview-box {
  flex: 1;
  padding: 15px;
  border: 1px dashed #dee2e6;
  border-radius: 5px;
  text-align: center;
}

.font-preview-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.font-preview-paragraph {
  font-size: 0.9rem;
}

#loginForm {
  margin-top: 20px;
}
</style>

