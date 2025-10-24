<script setup>
import { onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useGlobalConfig } from "@/composables/useGlobalConfig.js";
import "@/assets/js/login-script";

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const { config, updateColors, updateTypography, resetConfig } = useGlobalConfig();

onMounted(() => {
  store.state.isAbsolute = true;
  body.classList.remove("bg-gray-100");
  
  // Aplicar configuración global inmediatamente
  applyGlobalConfig();
  
  // Aplicar configuración desde localStorage
  applySavedConfig();
  
  // Inicializar controles de tipografía
  initializeFontControls();
  
  // Inicializar controles de color
  initializeColorControls();
  
  // Cargar configuración actual en los controles
  loadCurrentConfig();
});

onUnmounted(() => {
  body.classList.add("bg-gray-100");
});

// Función para aplicar configuración global
function applyGlobalConfig() {
  const root = document.documentElement;
  
  // Aplicar colores
  root.style.setProperty('--header-color', config.colors.header);
  root.style.setProperty('--button-color', config.colors.button);
  root.style.setProperty('--bg-color', config.colors.background);
  root.style.setProperty('--text-color', config.colors.text);
  root.style.setProperty('--title-color', config.colors.title);
  
  // Aplicar tipografía - Asegurar que se apliquen correctamente
  root.style.setProperty('--paragraph-font-family', config.typography.paragraphFont);
  root.style.setProperty('--paragraph-font-size', config.typography.paragraphSize);
  root.style.setProperty('--title-font-family', config.typography.titleFont);
  root.style.setProperty('--title-font-size', config.typography.titleSize);
  
  console.log('Configuración global aplicada:', config);
  
  // Forzar actualización de la vista
  setTimeout(() => {
    document.querySelectorAll('.example-page *').forEach(el => {
      el.style.fontFamily = 'inherit';
      el.style.fontSize = 'inherit';
    });
  }, 10);
}

// Función para aplicar configuración guardada desde localStorage
function applySavedConfig() {
  const root = document.documentElement;
  
  // Aplicar variables CSS por defecto
  root.style.setProperty('--paragraph-font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");
  root.style.setProperty('--paragraph-font-size', '16px');
  root.style.setProperty('--title-font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");
  root.style.setProperty('--title-font-size', '20px');
  
  // Aplicar configuración guardada si existe
  const savedConfig = localStorage.getItem('globalAppConfig');
  if (savedConfig) {
    try {
      const config = JSON.parse(savedConfig);
      if (config.typography) {
        root.style.setProperty('--paragraph-font-family', config.typography.paragraphFont);
        root.style.setProperty('--paragraph-font-size', config.typography.paragraphSize);
        root.style.setProperty('--title-font-family', config.typography.titleFont);
        root.style.setProperty('--title-font-size', config.typography.titleSize);
      }
    } catch (e) {
      console.error('Error loading saved config:', e);
    }
  }
  
  console.log('Configuración CSS aplicada desde localStorage');
}

// Función para inicializar los controles de tipografía
function initializeFontControls() {
  // Controles de tipografía de párrafos
  const paragraphFontSelect = document.getElementById('paragraphFont');
  const paragraphFontSizeSlider = document.getElementById('paragraphFontSize');
  const paragraphFontSizeDisplay = document.getElementById('paragraphFontSizeDisplay');

  // Controles de tipografía de títulos
  const titleFontSelect = document.getElementById('titleFont');
  const titleFontSizeSlider = document.getElementById('titleFontSize');
  const titleFontSizeDisplay = document.getElementById('titleFontSizeDisplay');

  // Event listeners para párrafos
  if (paragraphFontSelect) {
    paragraphFontSelect.addEventListener('change', function() {
      const fontFamily = this.value;
      updateTypography({ paragraphFont: fontFamily });
      
      // Aplicar inmediatamente a CSS variables y elementos
      document.documentElement.style.setProperty('--paragraph-font-family', fontFamily);
      
      // Actualizar elementos de párrafos en tiempo real
      updateParagraphElements(fontFamily, null);
      
      console.log('Párrafo font changed to:', fontFamily);
    });
  }

  if (paragraphFontSizeSlider) {
    paragraphFontSizeSlider.addEventListener('input', function() {
      const fontSize = this.value + 'px';
      updateTypography({ paragraphSize: fontSize });
      
      // Aplicar inmediatamente
      document.documentElement.style.setProperty('--paragraph-font-size', fontSize);
      
      // Actualizar elementos de párrafos en tiempo real
      updateParagraphElements(null, fontSize);
      
      if (paragraphFontSizeDisplay) {
        paragraphFontSizeDisplay.textContent = fontSize;
      }
      console.log('Párrafo font size changed to:', fontSize);
    });
  }

  // Event listeners para títulos
  if (titleFontSelect) {
    titleFontSelect.addEventListener('change', function() {
      const fontFamily = this.value;
      updateTypography({ titleFont: fontFamily });
      
      // Aplicar inmediatamente
      document.documentElement.style.setProperty('--title-font-family', fontFamily);
      
      // Actualizar elementos de títulos en tiempo real
      updateTitleElements(fontFamily, null);
      
      console.log('Título font changed to:', fontFamily);
    });
  }

  if (titleFontSizeSlider) {
    titleFontSizeSlider.addEventListener('input', function() {
      const fontSize = this.value + 'px';
      updateTypography({ titleSize: fontSize });
      
      // Aplicar inmediatamente
      document.documentElement.style.setProperty('--title-font-size', fontSize);
      
      // Actualizar elementos de títulos en tiempo real
      updateTitleElements(null, fontSize);
      
      if (titleFontSizeDisplay) {
        titleFontSizeDisplay.textContent = fontSize;
      }
      console.log('Título font size changed to:', fontSize);
    });
  }
}

// Función para actualizar elementos de párrafos en tiempo real
function updateParagraphElements(fontFamily, fontSize) {
  const paragraphElements = document.querySelectorAll('.example-page p, .example-page label, .example-page .form-control, .example-page .nav-link, .example-page .footer-link, .example-page .hero-description, .example-page .feature-description, .example-page .content-text, .example-page .example-list li, .example-page .footer-text');
  
  paragraphElements.forEach(el => {
    if (fontFamily) {
      el.style.fontFamily = fontFamily;
    }
    if (fontSize) {
      el.style.fontSize = fontSize;
    }
  });
}

// Función para actualizar elementos de títulos en tiempo real
function updateTitleElements(fontFamily, fontSize) {
  const titleElements = document.querySelectorAll('.example-page h1, .example-page h2, .example-page h3, .example-page h4, .example-page h5, .example-page h6, .example-page .site-title, .example-page .hero-title, .example-page .section-title, .example-page .feature-title');
  
  titleElements.forEach(el => {
    if (fontFamily) {
      el.style.fontFamily = fontFamily;
    }
    if (fontSize) {
      el.style.fontSize = fontSize;
    }
  });
}

// Función para inicializar controles de color
function initializeColorControls() {
  const colorInputs = ['headerColor', 'buttonColor', 'bgColor', 'textColor', 'titleColor'];
  
  colorInputs.forEach(colorId => {
    const input = document.getElementById(colorId);
    if (input) {
      input.addEventListener('input', function() {
        // Actualizar inmediatamente la vista
        applyGlobalConfig();
      });
    }
  });
}

// Función para cargar la configuración actual en los controles
function loadCurrentConfig() {
  // Esperar a que los elementos estén disponibles
  setTimeout(() => {
    // Cargar configuración de colores
    const headerColorInput = document.getElementById('headerColor');
    const buttonColorInput = document.getElementById('buttonColor');
    const bgColorInput = document.getElementById('bgColor');
    const textColorInput = document.getElementById('textColor');
    const titleColorInput = document.getElementById('titleColor');

    if (headerColorInput) headerColorInput.value = config.colors.header;
    if (buttonColorInput) buttonColorInput.value = config.colors.button;
    if (bgColorInput) bgColorInput.value = config.colors.background;
    if (textColorInput) textColorInput.value = config.colors.text;
    if (titleColorInput) titleColorInput.value = config.colors.title;

    // Cargar configuración de tipografía
    const paragraphFontSelect = document.getElementById('paragraphFont');
    const paragraphFontSizeSlider = document.getElementById('paragraphFontSize');
    const paragraphFontSizeDisplay = document.getElementById('paragraphFontSizeDisplay');
    const titleFontSelect = document.getElementById('titleFont');
    const titleFontSizeSlider = document.getElementById('titleFontSize');
    const titleFontSizeDisplay = document.getElementById('titleFontSizeDisplay');

    if (paragraphFontSelect) {
      paragraphFontSelect.value = config.typography.paragraphFont;
      // Disparar evento change para aplicar inmediatamente
      paragraphFontSelect.dispatchEvent(new Event('change'));
    }
    
    if (paragraphFontSizeSlider) {
      paragraphFontSizeSlider.value = parseInt(config.typography.paragraphSize);
      if (paragraphFontSizeDisplay) {
        paragraphFontSizeDisplay.textContent = config.typography.paragraphSize;
      }
      // Disparar evento input para aplicar inmediatamente
      paragraphFontSizeSlider.dispatchEvent(new Event('input'));
    }

    if (titleFontSelect) {
      titleFontSelect.value = config.typography.titleFont;
      // Disparar evento change para aplicar inmediatamente
      titleFontSelect.dispatchEvent(new Event('change'));
    }
    
    if (titleFontSizeSlider) {
      titleFontSizeSlider.value = parseInt(config.typography.titleSize);
      if (titleFontSizeDisplay) {
        titleFontSizeDisplay.textContent = config.typography.titleSize;
      }
      // Disparar evento input para aplicar inmediatamente
      titleFontSizeSlider.dispatchEvent(new Event('input'));
    }

    console.log('Configuración cargada:', config);
  }, 100);
}
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

    <!-- Controles de Tipografía -->
    <div class="font-control">
      <div class="font-label">Tipografía de Párrafos/Subtítulos</div>
      <select class="font-select" id="paragraphFont">
        <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Segoe UI</option>
        <option value="'Arial', sans-serif">Arial</option>
        <option value="'Helvetica', sans-serif">Helvetica</option>
        <option value="'Times New Roman', serif">Times New Roman</option>
        <option value="'Georgia', serif">Georgia</option>
        <option value="'Courier New', monospace">Courier New</option>
        <option value="'Verdana', sans-serif">Verdana</option>
        <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
        <option value="'Impact', sans-serif">Impact</option>
        <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
      </select>
    </div>

    <div class="font-control">
      <div class="font-label">Tamaño de Párrafos/Subtítulos (px)</div>
      <input type="range" class="font-size-slider" id="paragraphFontSize" min="10" max="24" value="16" />
      <div class="font-size-display" id="paragraphFontSizeDisplay">16px</div>
    </div>

    <div class="font-control">
      <div class="font-label">Tipografía de Títulos</div>
      <select class="font-select" id="titleFont">
        <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Segoe UI</option>
        <option value="'Arial', sans-serif">Arial</option>
        <option value="'Helvetica', sans-serif">Helvetica</option>
        <option value="'Times New Roman', serif">Times New Roman</option>
        <option value="'Georgia', serif">Georgia</option>
        <option value="'Courier New', monospace">Courier New</option>
        <option value="'Verdana', sans-serif">Verdana</option>
        <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
        <option value="'Impact', sans-serif">Impact</option>
        <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
      </select>
    </div>

    <div class="font-control">
      <div class="font-label">Tamaño de Títulos (px)</div>
      <input type="range" class="font-size-slider" id="titleFontSize" min="14" max="32" value="20" />
      <div class="font-size-display" id="titleFontSizeDisplay">20px</div>
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
    <div class="example-page-container">
      <div class="example-page texto-personalizable">
        <!-- Header de la página de ejemplo -->
        <header class="example-header">
          <div class="header-content">
            <h1 class="site-title">Mi Sitio Web</h1>
            <nav class="main-nav">
              <a href="#" class="nav-link">Inicio</a>
              <a href="#" class="nav-link">Productos</a>
              <a href="#" class="nav-link">Servicios</a>
              <a href="#" class="nav-link">Contacto</a>
            </nav>
          </div>
        </header>

        <!-- Contenido principal de la página de ejemplo -->
        <main class="example-main-content">
          <section class="hero-section">
            <h2 class="hero-title">Bienvenido a Nuestra Plataforma</h2>
            <p class="hero-description">
              Esta es una página de ejemplo que muestra cómo se vería tu sitio web con las configuraciones personalizadas de colores, tipografía y tamaños de fuente que has seleccionado.
            </p>
            <button class="cta-button">Comenzar Ahora</button>
          </section>

          <section class="features-section">
            <h3 class="section-title">Nuestras Características</h3>
            <div class="features-grid">
              <div class="feature-card">
                <h4 class="feature-title">Diseño Personalizable</h4>
                <p class="feature-description">
                  Puedes cambiar colores, fuentes y tamaños según tus preferencias para crear una experiencia única.
                </p>
              </div>
              <div class="feature-card">
                <h4 class="feature-title">Fácil de Usar</h4>
                <p class="feature-description">
                  Interfaz intuitiva que permite a los administradores configurar la apariencia sin conocimientos técnicos.
                </p>
              </div>
              <div class="feature-card">
                <h4 class="feature-title">Responsive</h4>
                <p class="feature-description">
                  Se adapta perfectamente a todos los dispositivos manteniendo la coherencia visual.
                </p>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3 class="section-title">Contenido de Ejemplo</h3>
            <div class="content-text">
              <p>
                Este párrafo muestra cómo se verá el texto normal con la tipografía y tamaño que has configurado. 
                Puedes ver cómo los colores, fuentes y tamaños se aplican consistentemente en toda la página.
              </p>
              <p>
                Los títulos utilizan la configuración de tipografía para títulos, mientras que este texto utiliza 
                la configuración para párrafos y subtítulos. Esto te permite tener un control total sobre la 
                apariencia de tu sitio web.
              </p>
              <ul class="example-list">
                <li>Elemento de lista con la tipografía configurada</li>
                <li>Otro elemento que muestra la consistencia</li>
                <li>Y un tercer elemento para completar la lista</li>
              </ul>
            </div>
          </section>

          <section class="form-section">
            <h3 class="section-title">Formulario de Ejemplo</h3>
            <form class="example-form">
              <div class="form-group">
                <label for="exampleName" class="form-label">Nombre Completo</label>
                <input type="text" class="form-control" id="exampleName" placeholder="Ingresa tu nombre" />
              </div>
              <div class="form-group">
                <label for="exampleEmail" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" id="exampleEmail" placeholder="tu@email.com" />
              </div>
              <div class="form-group">
                <label for="exampleMessage" class="form-label">Mensaje</label>
                <textarea class="form-control" id="exampleMessage" rows="4" placeholder="Escribe tu mensaje aquí..."></textarea>
              </div>
              <button type="submit" class="submit-button">Enviar Mensaje</button>
            </form>
          </section>
        </main>

        <!-- Footer de la página de ejemplo -->
        <footer class="example-footer">
          <div class="footer-content">
            <p class="footer-text">
              © 2024 Mi Sitio Web. Todos los derechos reservados.
            </p>
            <div class="footer-links">
              <a href="#" class="footer-link">Política de Privacidad</a>
              <a href="#" class="footer-link">Términos de Servicio</a>
              <a href="#" class="footer-link">Contacto</a>
            </div>
          </div>
        </footer>
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
  --local-secondary-font-size: 20px; /* Default for secondary font size */
  /* Nuevas variables para tipografía personalizable */
  --paragraph-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --paragraph-font-size: 16px;
  --title-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --title-font-size: 20px;
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

/* Estilos para controles de tipografía */
.font-control {
  margin-bottom: 25px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.font-label {
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
}

.font-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  background: white;
  font-size: 14px;
  margin-bottom: 10px;
}

.font-preview {
  font-size: 14px;
  padding: 8px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-top: 8px;
  min-height: 20px;
  display: flex;
  align-items: center;
}

.font-size-slider {
  width: 100%;
  margin-bottom: 8px;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: #dee2e6;
  outline: none;
}

.font-size-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--header-color);
  cursor: pointer;
}

.font-size-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--header-color);
  cursor: pointer;
  border: none;
}

.font-size-display {
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: var(--header-color);
  background: #f8f9fa;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  margin-top: 5px;
}

/* Mejorar la apariencia de los controles de tipografía */
.font-control {
  transition: all 0.3s ease;
}

.font-control:hover {
  background: #f0f8ff;
  border-color: var(--header-color);
}

.font-select:focus,
.font-size-slider:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

/* Asegurar que los controles funcionen en todos los navegadores */
.font-size-slider {
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(to right, #dee2e6 0%, var(--header-color) 0%);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.font-size-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--header-color);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: all 0.3s;
}

.font-size-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.font-size-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--header-color);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: all 0.3s;
}

.font-size-slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
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

/* Asegurar que los estilos se apliquen correctamente */
.example-page.texto-personalizable p,
.example-page.texto-personalizable label,
.example-page.texto-personalizable a:not(.config-btn):not(.back-to-home),
.example-page.texto-personalizable .form-control,
.example-page.texto-personalizable .nav-link,
.example-page.texto-personalizable .footer-link,
.example-page.texto-personalizable .hero-description,
.example-page.texto-personalizable .feature-description,
.example-page.texto-personalizable .content-text,
.example-page.texto-personalizable .example-list li,
.example-page.texto-personalizable .footer-text {
  font-family: var(--paragraph-font-family) !important;
  font-size: var(--paragraph-font-size) !important;
  transition: font-family 0.3s ease, font-size 0.3s ease;
}

/* Aplicar fuente secundaria a títulos dentro de example-page */
.example-page.texto-personalizable h1,
.example-page.texto-personalizable h2,
.example-page.texto-personalizable h3,
.example-page.texto-personalizable h4,
.example-page.texto-personalizable h5,
.example-page.texto-personalizable h6,
.example-page.texto-personalizable .site-title,
.example-page.texto-personalizable .hero-title,
.example-page.texto-personalizable .section-title,
.example-page.texto-personalizable .feature-title {
  font-family: var(--title-font-family) !important;
  font-size: var(--title-font-size) !important;
  transition: font-family 0.3s ease, font-size 0.3s ease;
}

/* Tamaños específicos para diferentes tipos de títulos */
.example-page.texto-personalizable .site-title {
  font-size: calc(var(--title-font-size) * 1.2) !important;
}

.example-page.texto-personalizable .hero-title {
  font-size: calc(var(--title-font-size) * 1.5) !important;
}

.example-page.texto-personalizable .section-title {
  font-size: calc(var(--title-font-size) * 1.1) !important;
}

.example-page.texto-personalizable .feature-title {
  font-size: var(--title-font-size) !important;
}

/* Keep constant layout size for inputs and buttons within the example page */
.example-page.texto-personalizable .form-control,
.example-page.texto-personalizable .cta-button,
.example-page.texto-personalizable .submit-button {
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

/* Example page container styles */
.example-page-container {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  width: 100%;
  background-color: var(--bg-color);
}

/* Example page styles */
.example-page {
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header styles */
.example-header {
  background-color: var(--header-color);
  color: white;
  padding: 20px 30px;
  border-bottom: 3px solid var(--button-color);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.site-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: white !important;
}

.main-nav {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.nav-link {
  color: white !important;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

/* Main content styles */
.example-main-content {
  padding: 40px 30px;
}

/* Hero section */
.hero-section {
  text-align: center;
  margin-bottom: 50px;
  padding: 40px 0;
  background: linear-gradient(135deg, var(--bg-color) 0%, rgba(255,255,255,0.8) 100%);
  border-radius: 10px;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--title-color) !important;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: var(--text-color);
}

.cta-button {
  background-color: var(--button-color);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.cta-button:hover {
  background-color: var(--header-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Features section */
.features-section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
  color: var(--title-color) !important;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  border-left: 4px solid var(--header-color);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--title-color) !important;
}

.feature-description {
  color: var(--text-color);
  line-height: 1.6;
}

/* Content section */
.content-section {
  margin-bottom: 50px;
}

.content-text {
  max-width: 800px;
  margin: 0 auto;
}

.content-text p {
  margin-bottom: 20px;
  line-height: 1.7;
  color: var(--text-color);
}

.example-list {
  margin: 20px 0;
  padding-left: 30px;
}

.example-list li {
  margin-bottom: 10px;
  color: var(--text-color);
}

/* Form section */
.form-section {
  background: var(--bg-color);
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 50px;
}

.example-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 25px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text-color);
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background: white;
  color: var(--text-color);
}

.form-control:focus {
  outline: none;
  border-color: var(--header-color);
  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

.submit-button {
  background-color: var(--button-color);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.submit-button:hover {
  background-color: var(--header-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Footer styles */
.example-footer {
  background-color: var(--title-color);
  color: white;
  padding: 30px;
  text-align: center;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
}

.footer-text {
  margin-bottom: 20px;
  color: white !important;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.footer-link {
  color: white !important;
  text-decoration: none;
  transition: opacity 0.3s;
}

.footer-link:hover {
  opacity: 0.8;
  text-decoration: none;
}

</style>