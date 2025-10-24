<template>
  <div class="config-bar">
      <h3 class="config-title">Panel de Configuración</h3>
      <div class="config-actions">
          <button class="config-btn" id="openConfigsModalBtn" title="Ver todos los presets guardados">
              <i class="fas fa-list-alt"></i> Presets
          </button>
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

  <div class="preview-container">
      <div class="preview-card texto-personalizable">
          <div class="preview-header">
              <h1 class="preview-main-title">Título</h1>
              <p class="preview-subtitle">Subtítulo descriptivo de la página</p>
          </div>
          <div class="preview-body">
              <!-- Sección de contenido principal -->
              <div class="preview-section">
                  <h2 class="preview-section-title">Sección Principal</h2>
                  <p class="preview-paragraph">Este es un párrafo de ejemplo que muestra cómo se verá el texto en tu página. Puedes ajustar el tamaño, color y fuente según tus preferencias.</p>
                  <p class="preview-paragraph">Otro párrafo para demostrar la consistencia en el estilo de texto. Observa cómo se aplican las configuraciones de color y tipografía.</p>
              </div>

              <!-- Sección de características -->
              <div class="preview-section">
                  <h3 class="preview-section-subtitle">Características Destacadas</h3>
                  <ul class="preview-list">
                      <li class="preview-list-item">Elemento de lista número uno</li>
                      <li class="preview-list-item">Segundo elemento de la lista</li>
                      <li class="preview-list-item">Tercer elemento demostrativo</li>
                  </ul>
              </div>

              <!-- Sección de botones -->
              <div class="preview-section">
                  <h4 class="preview-section-subtitle">Ejemplos de Botones</h4>
                  <div class="preview-buttons">
                      <button class="preview-btn primary">Botón Principal</button>
                      <button class="preview-btn secondary">Botón Secundario</button>
                      <a href="#" class="preview-link">Enlace de ejemplo</a>
                  </div>
              </div>

              <!-- Sección de formulario de ejemplo -->
              <div class="preview-section">
                  <h4 class="preview-section-subtitle">Formulario de Ejemplo</h4>
                  <div class="preview-form">
                      <div class="preview-form-group">
                          <label class="preview-label">Nombre completo</label>
                          <input type="text" class="preview-input" placeholder="Ingresa tu nombre">
                      </div>
                      <div class="preview-form-group">
                          <label class="preview-label">Correo electrónico</label>
                          <input type="email" class="preview-input" placeholder="ejemplo@correo.com">
                      </div>
                      <div class="preview-form-group">
                          <label class="preview-label">
                              <input type="checkbox" class="preview-checkbox">
                              Acepto los términos y condiciones
                          </label>
                      </div>
                  </div>
              </div>

              <!-- Sección de tarjetas -->
              <div class="preview-section">
                  <h3 class="preview-section-subtitle">Tarjetas de Contenido</h3>
                  <div class="preview-cards">
                      <div class="preview-card-item">
                          <h5 class="preview-card-title">Tarjeta 1</h5>
                          <p class="preview-card-text">Contenido de la primera tarjeta demostrativa.</p>
                      </div>
                      <div class="preview-card-item">
                          <h5 class="preview-card-title">Tarjeta 2</h5>
                          <p class="preview-card-text">Segunda tarjeta con contenido de ejemplo.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Sidebar izquierdo (Personalización) - CON dos sliders de tamaño -->
  <div class="color-sidebar">
      <h4 class="sidebar-title">Personalizar Apariencia</h4>
      
      <div class="color-control">
          <div class="color-label">Color 1</div>
          <input type="color" class="color-input" id="headerColor" value="#28a745">
          <div class="color-preview">
              <div id="headerPreview" style="width: 30px; height: 30px; background-color: #28a745; border-radius: 6px;"></div>
              <div class="color-hex" id="headerHex">#28a745</div>
          </div>
      </div>
      
      <div class="color-control">
          <div class="color-label">Color 2</div>
          <input type="color" class="color-input" id="buttonColor" value="#198754">
          <div class="color-preview">
              <div id="buttonPreview" style="width: 30px; height: 30px; background-color: #198754; border-radius: 6px;"></div>
              <div class="color-hex" id="buttonHex">#198754</div>
          </div>
      </div>
      
      <div class="color-control">
          <div class="color-label">Color de Fondo</div>
          <input type="color" class="color-input" id="bgColor" value="#f8f9fa">
          <div class="color-preview">
              <div id="bgPreview" style="width: 30px; height: 30px; background-color: #f8f9fa; border-radius: 6px; border: 1px solid #ddd;"></div>
              <div class="color-hex" id="bgHex">#f8f9fa</div>
          </div>
      </div>
      
      <div class="color-control">
          <div class="color-label">Color de Texto</div>
          <input type="color" class="color-input" id="textColor" value="#333333">
          <div class="color-preview">
              <div id="textPreview" style="width: 30px; height: 30px; background-color: #333333; border-radius: 6px;"></div>
              <div class="color-hex" id="textHex">#333333</div>
          </div>
      </div>
      
      <div class="color-control">
          <div class="color-label">Color de Títulos</div>
          <input type="color" class="color-input" id="titleColor" value="#212529">
          <div class="color-preview">
              <div id="titlePreview" style="width: 30px; height: 30px; background-color: #212529; border-radius: 6px;"></div>
              <div class="color-hex" id="titleHex">#212529</div>
          </div>
      </div>
      
      <h4 class="sidebar-title mt-4">Personalizar Texto</h4>
      <div class="additional-options" style="border-top: none; margin-top: 0; padding-top: 0;">
          <div class="option-group">
              <label class="option-label">Tamaño de Párrafos y Subtítulos (1-100px)</label>
              <input type="range" class="form-range" id="paragraphFontSizeRange" min="1" max="100" value="16">
              <span id="paragraphFontSizeValue">16px</span>
          </div>
          
          <div class="option-group">
              <label class="option-label">Tamaño de Títulos (1-100px)</label>
              <input type="range" class="form-range" id="titleFontSizeRange" min="1" max="100" value="24">
              <span id="titleFontSizeValue">24px</span>
          </div>
          
          <div class="option-group">
              <label class="option-label">Fuente Principal (Párrafos)</label>
              <select class="option-select" id="primaryFontSelect">
                  <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" selected>Segoe UI (Defecto)</option>
                  <option value="Roboto, sans-serif">Roboto</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Courier New', monospace">Courier New</option>
              </select>
          </div>
          
          <div class="option-group">
              <label class="option-label">Fuente Secundaria (Títulos)</label>
              <select class="option-select" id="secondaryFontSelect">
                  <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" selected>Segoe UI (Defecto)</option>
                  <option value="Roboto, sans-serif">Roboto</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Courier New', monospace">Courier New</option>
              </select>
          </div>
      </div>

      <!-- Agregar esto en el color-sidebar, después de los selects de fuentes existentes -->
    <div class="option-group">
        <label class="option-label">Agregar Fuente Personalizada</label>
        <input type="file" class="option-input" id="fontFileInput" accept=".ttf,.otf,.woff,.woff2" style="display: none;">
        <button class="config-management-btn secondary" id="openFontFileInput" style="width: 100%; margin-bottom: 10px;">
            <i class="fas fa-upload"></i> Seleccionar Archivo .ttf
        </button>
        <input type="text" class="modal-input" id="customFontName" placeholder="Nombre de la fuente" style="margin-bottom: 10px;">
        <button class="config-management-btn success" id="addCustomFont" style="width: 100%;" disabled>
            <i class="fas fa-plus"></i> Agregar Fuente
        </button>
        <div id="fontPreview" style="margin-top: 10px; padding: 10px; border: 1px dashed #ddd; border-radius: 5px; display: none;">
            <div style="font-size: 16px; margin-bottom: 5px;">Vista previa:</div>
            <div id="fontPreviewText" style="font-size: 18px; font-weight: bold;">AaBbCc 123</div>
        </div>
    </div>

    <!-- Lista de fuentes personalizadas agregadas -->
    <div class="option-group" id="customFontsGroup" style="display: none;">
        <label class="option-label">Fuentes Personalizadas</label>
        <div id="customFontsList" class="custom-fonts-list"></div>
    </div>
      
      <button class="reset-btn" id="resetAll">
          <i class="fas fa-undo"></i> Restablecer Todo
      </button>
  </div>

  <!-- Nuevo Sidebar Derecho (Configuraciones Guardadas) -->
  <div class="config-sidebar">
      <h4 class="sidebar-title">Configuraciones Guardadas</h4>
      
      <div class="config-management">
          <h5 class="config-management-title">Gestión de Configuraciones</h5>
          <div class="config-management-buttons">
              <button class="config-management-btn success" id="saveAsConfigBtn">
                  <i class="fas fa-save"></i> Guardar Como...
              </button>
          </div>
          
          <div class="configs-header">
              <h6 class="configs-title">Mis Configuraciones</h6>
              <span class="configs-count" id="configsCount">0 guardadas</span>
          </div>
          
          <div class="search-box">
              <input type="text" class="search-input" id="searchConfigs" placeholder="Buscar configuraciones...">
          </div>
          
          <div class="configs-list" id="configsList">
              <div class="empty-configs">No hay configuraciones guardadas</div>
          </div>
      </div>
  </div>

  <div class="modal-overlay" id="saveModal">
      <div class="modal-content">
          <h3 class="modal-title">Guardar Configuración</h3>
          <input type="text" class="modal-input" id="configName" placeholder="Nombre de la configuración" maxlength="30">
          <div class="modal-actions">
              <button class="modal-btn secondary" id="cancelSave">Cancelar</button>
              <button class="modal-btn primary" id="confirmSave">Guardar</button>
          </div>
      </div>
  </div>

  <div class="modal-overlay" id="configsModal">
      <div class="modal-content" style="max-width: 650px;">
          <h3 class="modal-title">Presets de Apariencia Guardados</h3>
          
          <div class="configs-header">
              <h6 class="configs-title">Mis Configuraciones Guardadas</h6>
              <span class="configs-count" id="modalConfigsCount">0 guardadas</span>
          </div>
          
          <div class="search-box">
              <input type="text" class="search-input" id="searchModalConfigs" placeholder="Buscar configuraciones...">
          </div>
          
          <div class="configs-list" id="modalConfigsList" style="max-height: 400px; padding: 0;">
              <div class="empty-configs">No hay configuraciones guardadas</div>
          </div>
          
          <div class="modal-actions" style="margin-top: 20px;">
              <button class="modal-btn secondary" id="closeConfigsModal">Cerrar</button>
          </div>
      </div>
  </div>

  <div class="context-menu" id="contextMenu">
      <div class="context-menu-item" id="contextMenuLoad">
          <i class="fas fa-arrow-alt-circle-right"></i> Cargar
      </div>
      <div class="context-menu-item delete" id="contextMenuDelete">
          <i class="fas fa-trash"></i> Eliminar
      </div>
  </div>

  <div id="notification" class="notification"></div>
</template>

<script>
      document.addEventListener('DOMContentLoaded', function() {
          // --- VARIABLES Y ELEMENTOS DE COLOR ---
          const defaultColors = {
              header: '#28a745',
              button: '#198754',
              bg: '#f8f9fa',
              text: '#333333',
              title: '#212529'
          };

          const colorInputs = {
              header: document.getElementById('headerColor'),
              button: document.getElementById('buttonColor'),
              bg: document.getElementById('bgColor'),
              text: document.getElementById('textColor'),
              title: document.getElementById('titleColor')
          };

          const colorPreviews = {
              header: document.getElementById('headerPreview'),
              button: document.getElementById('buttonPreview'),
              bg: document.getElementById('bgPreview'),
              text: document.getElementById('textPreview'),
              title: document.getElementById('titlePreview')
          };
          
          const colorHexes = {
              header: document.getElementById('headerHex'),
              button: document.getElementById('buttonHex'),
              bg: document.getElementById('bgHex'),
              text: document.getElementById('textHex'),
              title: document.getElementById('titleHex')
          };

          const resetBtn = document.getElementById('resetAll');
          const rootElement = document.documentElement;

          // --- VARIABLES Y ELEMENTOS DE TEXTO ---
          const paragraphFontSizeRange = document.getElementById('paragraphFontSizeRange');
          const titleFontSizeRange = document.getElementById('titleFontSizeRange');
          const primaryFontSelect = document.getElementById('primaryFontSelect');
          const secondaryFontSelect = document.getElementById('secondaryFontSelect');
          const paragraphFontSizeValue = document.getElementById('paragraphFontSizeValue');
          const titleFontSizeValue = document.getElementById('titleFontSizeValue');

          // --- ELEMENTOS DE GESTIÓN DE CONFIGURACIONES ---
          const saveConfigBtn = document.getElementById('saveConfigBtn');
          const saveAsConfigBtn = document.getElementById('saveAsConfigBtn');
          const exportConfigBtn = document.getElementById('exportConfigBtn');
          const notification = document.getElementById('notification');
          
          // --- ELEMENTOS DE LA LISTA DE CONFIGURACIONES EN SIDEBAR DERECHO ---
          const configsList = document.getElementById('configsList');
          const configsCount = document.getElementById('configsCount');
          const searchConfigs = document.getElementById('searchConfigs');
          
          // --- ELEMENTOS DEL MODAL DE GUARDAR ---
          const saveModal = document.getElementById('saveModal');
          const configName = document.getElementById('configName');
          const cancelSave = document.getElementById('cancelSave');
          const confirmSave = document.getElementById('confirmSave');
          
          // --- ELEMENTOS DEL NUEVO MODAL DE PRESETS (SOLICITADO) ---
          const openConfigsModalBtn = document.getElementById('openConfigsModalBtn');
          const configsModal = document.getElementById('configsModal');
          const closeConfigsModal = document.getElementById('closeConfigsModal');
          const modalConfigsList = document.getElementById('modalConfigsList');
          const modalConfigsCount = document.getElementById('modalConfigsCount');
          const searchModalConfigs = document.getElementById('searchModalConfigs');
          
          // --- ELEMENTOS DEL MENÚ CONTEXTUAL (REVERTIDO) ---
          const contextMenu = document.getElementById('contextMenu');
          const contextMenuLoad = document.getElementById('contextMenuLoad');
          const contextMenuDelete = document.getElementById('contextMenuDelete');
          
          // --- VARIABLES GLOBALES ---
          let savedConfigs = [];
          let currentConfigId = null;
          let selectedConfigId = null;

          // --- FUNCIONES DE UTILIDAD ---
          function showNotification(message, type = 'success') {
              notification.textContent = message;
              notification.className = `notification ${type} show`;
              
              setTimeout(() => {
                  notification.classList.remove('show');
              }, 3000);
          }

          function getCurrentConfig() {
              return {
                  id: currentConfigId || Date.now().toString(),
                  name: "Configuración Actual",
                  colors: {
                      header: colorInputs.header.value,
                      button: colorInputs.button.value,
                      bg: colorInputs.bg.value,
                      text: colorInputs.text.value,
                      title: colorInputs.title.value
                  },
                  text: {
                      paragraphFontSize: paragraphFontSizeRange.value,
                      titleFontSize: titleFontSizeRange.value,
                      primaryFontFamily: primaryFontSelect.value,
                      secondaryFontFamily: secondaryFontSelect.value
                  },
                  timestamp: new Date().toISOString()
              };
          }

          function applyConfig(config) {
              // Aplicar colores
              for (const key in config.colors) {
                  if (colorInputs[key]) {
                      colorInputs[key].value = config.colors[key];
                  }
              }
              
              // Aplicar configuración de texto
              if (config.text) {
                  paragraphFontSizeRange.value = config.text.paragraphFontSize || 16;
                  titleFontSizeRange.value = config.text.titleFontSize || 24;
                  primaryFontSelect.value = config.text.primaryFontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
                  secondaryFontSelect.value = config.text.secondaryFontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
              }
              
              // Actualizar la vista
              updateColors();
              updateTextStyles();
              
              // Actualizar el ID actual
              currentConfigId = config.id;
          }

          // --- FUNCIONES PRINCIPALES ---
          function updateColors() {
              // Actualizar variables CSS de Color
              rootElement.style.setProperty('--header-color', colorInputs.header.value);
              rootElement.style.setProperty('--button-color', colorInputs.button.value);
              rootElement.style.setProperty('--bg-color', colorInputs.bg.value);
              rootElement.style.setProperty('--text-color', colorInputs.text.value);
              rootElement.style.setProperty('--title-color', colorInputs.title.value);
              
              // Aplicar color de fondo a toda la ventana
              document.body.style.backgroundColor = colorInputs.bg.value;
              
              // Actualizar vistas previas y códigos hexadecimales
              for (const key in colorInputs) {
                  const value = colorInputs[key].value;
                  colorPreviews[key].style.backgroundColor = value;
                  colorHexes[key].textContent = value;
              }
          }
          
          function updateTextStyles() {
              const paragraphSize = parseInt(paragraphFontSizeRange.value) + 'px';
              const titleSize = parseInt(titleFontSizeRange.value) + 'px';
              const primaryFamily = primaryFontSelect.value;
              const secondaryFamily = secondaryFontSelect.value;
              
              // Actualizar valores mostrados
              paragraphFontSizeValue.textContent = paragraphSize;
              titleFontSizeValue.textContent = titleSize;

              // Establecer variables CSS de Texto (SOLO para texto, no para botones/inputs)
              rootElement.style.setProperty('--paragraph-font-size', paragraphSize);
              rootElement.style.setProperty('--title-font-size', titleSize);
              rootElement.style.setProperty('--local-font-family', primaryFamily);
              rootElement.style.setProperty('--local-title-font-family', secondaryFamily);
          }

          function saveConfigsToStorage() {
              localStorage.setItem('zayShopConfigs', JSON.stringify(savedConfigs));
          }

          function loadConfigsFromStorage() {
              const saved = localStorage.getItem('zayShopConfigs');
              if (saved) {
                  try {
                      savedConfigs = JSON.parse(saved);
                      renderConfigsList();
                  } catch (e) {
                      console.error('Error al cargar configuraciones:', e);
                      savedConfigs = [];
                  }
              }
          }

          function saveCurrentConfig(name) {
              const config = getCurrentConfig();
              config.name = name || `Configuración ${new Date().toLocaleDateString()}`;
              config.timestamp = new Date().toISOString();
              
              // Verificar si ya existe una configuración con este ID
              const existingIndex = savedConfigs.findIndex(c => c.id === currentConfigId);
              
              if (existingIndex !== -1 && currentConfigId) {
                  // Actualizar configuración existente si tiene un ID
                  savedConfigs[existingIndex] = config;
                  showNotification('Configuración actualizada', 'success');
              } else {
                  // Generar un nuevo ID si se guarda como nueva
                  config.id = Date.now().toString(); 
                  savedConfigs.push(config);
                  showNotification('Configuración guardada', 'success');
              }
              
              saveConfigsToStorage();
              renderConfigsList();
              closeSaveModal();
          }

          function saveAsCurrentConfig() {
              openSaveModal();
          }

          function openSaveModal() {
              saveModal.classList.add('show');
              configName.value = '';
              configName.focus();
          }

          function closeSaveModal() {
              saveModal.classList.remove('show');
          }

          function loadConfig(configId) {
              const config = savedConfigs.find(c => c.id === configId);
              if (config) {
                  applyConfig(config);
                  showNotification(`Configuración "${config.name}" cargada`, 'success');
              }
          }

          function deleteConfig(configId) {
              if (confirm('¿Estás seguro de que quieres eliminar esta configuración?')) {
                  savedConfigs = savedConfigs.filter(c => c.id !== configId);
                  saveConfigsToStorage();
                  renderConfigsList();
                  showNotification('Configuración eliminada', 'info');
              }
          }

          function getFontFamilyName(fontFamilyValue) {
              const fontMap = {
                  "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif": "Segoe UI",
                  "Roboto, sans-serif": "Roboto",
                  "Arial, sans-serif": "Arial",
                  "Georgia, serif": "Georgia",
                  "'Courier New', monospace": "Courier New"
              };
              
              return fontMap[fontFamilyValue] || fontFamilyValue;
          }

          function renderConfigsList() {
              
              // Obtener filtros de ambos campos de búsqueda
              const sidebarFilter = searchConfigs.value.toLowerCase();
              const modalFilter = searchModalConfigs.value.toLowerCase();
              
              // Ordenar por fecha (más reciente primero)
              const sortedConfigs = savedConfigs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
              
              // Listas de elementos a actualizar: [ [elemento_lista_html, elemento_contador_html, filtro_aplicar] ]
              const listsToUpdate = [
                  [configsList, configsCount, sidebarFilter], 
                  [modalConfigsList, modalConfigsCount, modalFilter]
              ];
              
              listsToUpdate.forEach(([targetList, targetCount, currentFilter]) => {
                  const currentFiltered = sortedConfigs.filter(config => 
                      config.name.toLowerCase().includes(currentFilter)
                  );

                  if (currentFiltered.length === 0) {
                      targetList.innerHTML = '<div class="empty-configs">No hay configuraciones guardadas</div>';
                      targetCount.textContent = '0 guardadas';
                      return;
                  }
                  
                  targetList.innerHTML = '';
                  currentFiltered.forEach(config => {
                      const configItem = document.createElement('div');
                      configItem.className = 'config-item';
                      configItem.dataset.id = config.id;
                      
                      // Crear mini vista previa de colores (primeros 5)
                      const colorValues = Object.values(config.colors);
                      const colorsPreview = colorValues.map(color => 
                          `<div class="color-dot" style="background-color: ${color}"></div>`
                      ).join('');
                      
                      const date = new Date(config.timestamp);
                      const formattedDate = date.toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                      });
                      
                      // Obtener los nombres amigables de las fuentes
                      const primaryFontName = getFontFamilyName(config.text.primaryFontFamily);
                      const secondaryFontName = getFontFamilyName(config.text.secondaryFontFamily);

                      // Generar el HTML con información de tamaños
                      configItem.innerHTML = `
                          <div class="config-item-info">
                              <div class="config-item-colors">${colorsPreview}</div>
                              <div class="config-item-content">
                                  <div class="config-item-main">
                                      <div class="config-item-name">${config.name}</div>
                                  </div>
                                  <div class="config-item-date">${formattedDate}</div>
                                  <div class="font-preview">
                                      <span style="font-family: ${config.text.primaryFontFamily}">
                                          Principal: ${primaryFontName} - ${config.text.paragraphFontSize}px
                                      </span>
                                      | 
                                      <span style="font-family: ${config.text.secondaryFontFamily}">
                                          Secundaria: ${secondaryFontName} - ${config.text.titleFontSize}px
                                      </span>
                                  </div>
                              </div>
                          </div>
                      `;
                      
                      targetList.appendChild(configItem);
                      
                      // Agregar eventos para clic izquierdo (cargar) y clic derecho (menú contextual)
                      configItem.addEventListener('click', function(e) {
                          if (e.button === 0) { // Solo clic izquierdo
                              loadConfig(this.dataset.id);
                              configsModal.classList.remove('show'); // Cerrar el modal si se carga desde él
                          }
                      });
                      
                      configItem.addEventListener('contextmenu', function(e) {
                          e.preventDefault();
                          selectedConfigId = this.dataset.id; // Almacenar ID del preset
                          
                          // Mostrar opción de Cargar (solo para presets)
                          contextMenu.querySelector('#contextMenuLoad').style.display = 'block'; 
                          showContextMenu(e.clientX, e.clientY);
                      });
                  });
                  
                  targetCount.textContent = `${currentFiltered.length} guardada${currentFiltered.length !== 1 ? 's' : ''}`;
              });
          }

          function showContextMenu(x, y) {
              // Asegurarse de que el menú no salga de los límites de la pantalla
              const maxX = window.innerWidth - contextMenu.offsetWidth;
              const maxY = window.innerHeight - contextMenu.offsetHeight;

              contextMenu.style.left = Math.min(x, maxX) + 'px';
              contextMenu.style.top = Math.min(y, maxY) + 'px';
              contextMenu.classList.add('show');
          }

          function hideContextMenu() {
              contextMenu.classList.remove('show');
              selectedConfigId = null; 
          }

          function exportConfig() {
              const config = getCurrentConfig();
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
              const downloadAnchorNode = document.createElement('a');
              downloadAnchorNode.setAttribute("href", dataStr);
              downloadAnchorNode.setAttribute("download", `zayshop-config-${new Date().getTime()}.json`);
              document.body.appendChild(downloadAnchorNode);
              downloadAnchorNode.click();
              downloadAnchorNode.remove();
              showNotification('Configuración exportada', 'success');
          }

          function resetAll() {
              if (confirm('¿Estás seguro de que quieres restablecer todos los valores a los predeterminados?')) {
                  // Restablecer colores
                  colorInputs.header.value = defaultColors.header;
                  colorInputs.button.value = defaultColors.button;
                  colorInputs.bg.value = defaultColors.bg;
                  colorInputs.text.value = defaultColors.text;
                  colorInputs.title.value = defaultColors.title;
                  
                  // Restablecer texto
                  paragraphFontSizeRange.value = 16;
                  titleFontSizeRange.value = 24;
                  primaryFontSelect.value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
                  secondaryFontSelect.value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
                  
                  // Actualizar la vista
                  updateColors();
                  updateTextStyles();
                  
                  showNotification('Configuración restablecida', 'info');
              }
          }

          // --- EVENT LISTENERS ---
          // Eventos para colores
          for (const key in colorInputs) {
              colorInputs[key].addEventListener('input', updateColors);
          }
          
          // Eventos para texto
          paragraphFontSizeRange.addEventListener('input', updateTextStyles);
          titleFontSizeRange.addEventListener('input', updateTextStyles);
          primaryFontSelect.addEventListener('change', updateTextStyles);
          secondaryFontSelect.addEventListener('change', updateTextStyles);
          
          // Eventos para gestión de configuraciones
          saveConfigBtn.addEventListener('click', () => saveCurrentConfig(null));
          saveAsConfigBtn.addEventListener('click', saveAsCurrentConfig);
          exportConfigBtn.addEventListener('click', exportConfig);
          resetBtn.addEventListener('click', resetAll);
          
          // Eventos del modal de guardar
          cancelSave.addEventListener('click', closeSaveModal);
          confirmSave.addEventListener('click', () => {
              if (configName.value.trim()) {
                  saveCurrentConfig(configName.value.trim());
              } else {
                  showNotification('Por favor, ingresa un nombre para la configuración', 'error');
              }
          });
          
          // Eventos del NUEVO modal de presets
          openConfigsModalBtn.addEventListener('click', () => {
              renderConfigsList(); 
              configsModal.classList.add('show');
              searchModalConfigs.focus();
          });

          closeConfigsModal.addEventListener('click', () => {
              configsModal.classList.remove('show');
          });

          // Evento para búsqueda en el modal
          searchModalConfigs.addEventListener('input', function() {
              renderConfigsList(); 
          });
          
          // Evento para búsqueda en el sidebar
          searchConfigs.addEventListener('input', function() {
              renderConfigsList();
          });
          
          // Eventos del menú contextual (Cargar y Eliminar)
          contextMenuLoad.addEventListener('click', () => {
              if (selectedConfigId) {
                  loadConfig(selectedConfigId);
                  configsModal.classList.remove('show'); // Cerrar el modal al cargar si se abrió desde allí
              }
              hideContextMenu();
          });

          contextMenuDelete.addEventListener('click', () => {
              if (selectedConfigId) {
                  deleteConfig(selectedConfigId);
              }
              hideContextMenu();
          });
          
          // Cerrar menú contextual y limpiar variables al hacer clic en otra parte
          document.addEventListener('click', hideContextMenu);
          document.addEventListener('contextmenu', (e) => {
              if (!e.target.closest('.config-item')) {
                  hideContextMenu();
              }
          });

          // Cerrar modales al hacer clic fuera de ellos
          saveModal.addEventListener('click', function(e) {
              if (e.target === this) {
                  closeSaveModal();
              }
          });
          configsModal.addEventListener('click', function(e) {
              if (e.target === this) {
                  configsModal.classList.remove('show');
              }
          });
          
          // Evento para la tecla Enter en el modal de guardar
          configName.addEventListener('keypress', function(e) {
              if (e.key === 'Enter') {
                  confirmSave.click();
              }
          });
          
          // --- INICIALIZACIÓN ---
          updateColors();
          updateTextStyles();
          loadConfigsFromStorage();
      });
</script>

<style>
      /* Variables CSS (Actualizadas con los nuevos sliders) */
      :root {
          --header-color: #28a745;
          --button-color: #198754;
          --bg-color: #f8f9fa;
          --text-color: #333333;
          --title-color: #212529;
          /* Nuevas variables para tamaños de fuente */
          --paragraph-font-size: 16px;
          --title-font-size: 24px;
          --local-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          --local-title-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: var(--bg-color); /* Color de fondo aplicado a toda la ventana */
          color: var(--text-color);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: all 0.3s ease;
      }
      
      /* Aplicar color de texto y fuente a todos los elementos */
      .preview-container * {
          color: var(--text-color);
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

      .config-bar * {
          color: #333333 !important;
      }
      
      .config-title {
          font-weight: 600;
          margin: 0;
          font-size: 1.2rem !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
          color: #333333 !important;
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
          font-size: 1rem !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
      }
      
      .config-btn:hover {
          background-color: #f8f9fa;
      }
      
      /* Contenedor principal de Vista Previa */
      .preview-container {
          min-height: calc(100vh - 60px); 
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 80px 20px 20px;
          /* Margin para compensar ambos sidebars */
          margin-left: 380px; 
          margin-right: 380px;
          width: calc(100% - 760px);
      }
      
      .preview-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          overflow: hidden;
          width: 100%;
          max-width: 900px;
      }
      
      .preview-header {
          background-color: white;
          padding: 40px 40px 20px;
          text-align: center;
          transition: background-color 0.3s ease;
          border-bottom: 5px solid var(--header-color); 
      }
      
      .preview-main-title {
          color: var(--title-color) !important;
          font-family: var(--local-title-font-family) !important;
          font-size: var(--title-font-size) !important;
          font-weight: 700;
          margin-bottom: 10px;
      }
      
      .preview-subtitle {
          color: var(--text-color);
          font-family: var(--local-font-family) !important;
          font-size: var(--paragraph-font-size) !important;
          opacity: 0.8;
      }
      
      .preview-body {
          padding: 40px;
      }
      
      .preview-section {
          margin-bottom: 40px;
      }
      
      .preview-section-title {
          color: var(--title-color) !important;
          font-family: var(--local-title-font-family) !important;
          font-size: var(--title-font-size) !important;
          margin-bottom: 20px;
          border-bottom: 2px solid var(--header-color);
          padding-bottom: 10px;
      }
      
      .preview-section-subtitle {
          color: var(--title-color) !important;
          font-family: var(--local-title-font-family) !important;
          font-size: calc(var(--title-font-size) * 0.8) !important;
          margin-bottom: 15px;
      }
      
      .preview-paragraph {
          color: var(--text-color);
          font-family: var(--local-font-family) !important;
          font-size: var(--paragraph-font-size) !important;
          line-height: 1.6;
          margin-bottom: 15px;
      }
      
      .preview-list {
          color: var(--text-color);
          font-family: var(--local-font-family) !important;
          font-size: var(--paragraph-font-size) !important;
          padding-left: 20px;
      }
      
      .preview-list-item {
          margin-bottom: 8px;
      }
      
      .preview-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
      }
      
      .preview-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 5px;
          font-family: var(--local-font-family) !important;
          font-size: 16px !important; /* Tamaño fijo para botones */
          cursor: pointer;
          transition: all 0.3s;
      }
      
      .preview-btn.primary {
          background-color: var(--button-color);
          color: white;
      }
      
      .preview-btn.secondary {
          background-color: #6c757d;
          color: white;
      }
      
      .preview-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
      }
      
      .preview-link {
          color: var(--header-color);
          font-family: var(--local-font-family) !important;
          font-size: var(--paragraph-font-size) !important;
          text-decoration: none;
      }
      
      .preview-link:hover {
          text-decoration: underline;
      }
      
      .preview-form {
          max-width: 500px;
      }
      
      .preview-form-group {
          margin-bottom: 20px;
      }
      
      .preview-label {
          display: block;
          color: var(--text-color);
          font-family: var(--local-font-family) !important;
          font-size: var(--paragraph-font-size) !important;
          margin-bottom: 8px;
          font-weight: 500;
      }
      
      .preview-input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #dee2e6;
          border-radius: 5px;
          font-family: var(--local-font-family) !important;
          font-size: 16px !important; /* Tamaño fijo para inputs */
          transition: border-color 0.3s;
      }
      
      .preview-input:focus {
          outline: none;
          border-color: var(--header-color);
      }
      
      .preview-checkbox {
          margin-right: 8px;
      }
      
      .preview-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
      }
      
      .preview-card-item {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #e9ecef;
      }
      
      .preview-card-title {
          color: var(--title-color) !important;
          font-family: var(--local-title-font-family) !important;
          font-size: calc(var(--title-font-size) * 0.7) !important;
          margin-bottom: 10px;
      }
      
      .preview-card-text {
          color: var(--text-color);
          font-family: var(--local-font-family) !important;
          font-size: var(--paragraph-font-size) !important;
      }
      
      /* Sidebar Izquierdo Muy Extendido (Posición Fija a la Izquierda) - FUENTE FIJA */
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
          font-size: 1rem !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
      }
      
      .color-sidebar * {
          font-size: 1rem !important;
          color: #333333 !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
      }

      .color-sidebar h4 {
          font-size: 1.4rem !important;
      }
      
      /* Nuevo Sidebar Derecho para Configuraciones Guardadas */
      .config-sidebar {
          position: fixed;
          top: 60px; /* Debajo de la barra de configuración */
          right: 0;
          bottom: 0;
          height: calc(100vh - 60px);
          background: white;
          box-shadow: -2px 0 10px rgba(0,0,0,0.1);
          padding: 30px;
          z-index: 1000;
          width: 380px;
          overflow-y: auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
      }
      
      .config-sidebar * {
          font-size: 1rem !important;
          color: #333333 !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
      }

      .config-sidebar h4 {
        font-size: 1.4rem !important;
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
          color: white !important;
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
      
      /* Estilos para la gestión de configuraciones (ahora en sidebar derecho) */
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
          color: white !important;
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
          color: white !important;
      }
      
      .notification.error {
          background-color: #dc3545;
          color: white !important;
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
          cursor: pointer; /* Cursor de puntero para indicar interactividad */
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
          align-items: flex-start; /* Alineación cambiada para mejor flujo */
          gap: 10px;
      }
      
      .config-item-colors {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-right: 10px;
          margin-top: 5px;
      }
      
      .color-dot {
          width: 10px; /* Reducido para mejor vista en lista */
          height: 10px; /* Reducido para mejor vista en lista */
          border-radius: 50%;
          border: 1px solid #ddd;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      
      .config-item-name {
          font-weight: 600;
          margin-bottom: 3px;
          font-size: 15px;
      }
      
      .config-item-date {
          font-size: 0.8rem;
          color: #6c757d;
      }
      
      /* .config-item-actions ha sido eliminado del CSS */
      
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
          background-color: #f8f9fa;
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
          font-size: 1.3rem !important; /* Tamaño relativo pero fijo */
          color: #333333 !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
      }
      
      .modal-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #dee2e6;
          border-radius: 5px;
          margin-bottom: 15px;
          color: #333333 !important;
          font-size: 14px !important; /* Tamaño fijo para input de modal */
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
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
          color: white !important;
          font-size: 14px !important; /* Tamaño fijo para botones del modal */
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
      }
      
      .modal-btn.primary {
          background-color: #007bff;
          color: white;
      }
      
      .modal-btn.secondary {
          background-color: #6c757d;
          color: white;
      }

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
           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
           font-size: 16px !important; /* Tamaño fijo para notificaciones */
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

      .config-item-content {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
      }
      
      .config-item-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
      }
      
      .font-preview {
          font-size: 0.8rem;
          color: #6c757d;
          margin-top: 2px;
      }
      
      /* Menú contextual */
      .context-menu {
          position: fixed;
          background: white;
          border-radius: 5px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 1400;
          min-width: 150px;
          display: none;
          border: 1px solid #ddd;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
          font-size: 14px !important; /* Tamaño fijo para menú contextual */
      }
      
      .context-menu.show {
          display: block;
      }
      
      .context-menu-item {
          padding: 10px 15px;
          cursor: pointer;
          transition: background-color 0.2s;
          white-space: nowrap; /* Evitar que el texto se rompa */
          color: #333333 !important;
          font-size: 14px !important; /* Tamaño fijo para items del menú */
      }
      
      .context-menu-item:hover {
          background-color: #f8f9fa;
      }
      
      .context-menu-item.delete {
          color: #dc3545;
          border-top: 1px solid #eee; /* Separador para Eliminar */
      }
      
      .context-menu-item i {
          margin-right: 8px;
          width: 16px;
      }

      /* Estilos para fuentes personalizadas */
        .custom-fonts-list {
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            padding: 10px;
            margin-top: 10px;
        }

        .custom-font-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            border-bottom: 1px solid #f1f1f1;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }

        .custom-font-item:last-child {
            border-bottom: none;
        }

        .custom-font-name {
            font-weight: 600;
            flex-grow: 1;
        }

        .custom-font-remove {
            background: none;
            border: none;
            color: #dc3545;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 12px !important;
        }

        .custom-font-remove:hover {
            background-color: #f8d7da;
        }

        .font-preview-active {
            font-family: inherit !important;
        }
</style>