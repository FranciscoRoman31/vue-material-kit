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
        bg: document.getElementById('bgPreview'),
        text: document.getElementById('textHex'),
        title: document.getElementById('titleHex')
    };

    const resetBtn = document.getElementById('resetAll');
    const rootElement = document.documentElement;

    // --- VARIABLES Y ELEMENTOS DE TEXTO (Recuperados de peticiones anteriores) ---
    const fontSizeRange = document.getElementById('fontSizeRange');
    const primaryFontSelect = document.getElementById('primaryFontSelect');
    const secondaryFontSelect = document.getElementById('secondaryFontSelect');
    const fontSizeValue = document.getElementById('fontSizeValue');

    // --- ELEMENTOS DE GESTIÓN DE CONFIGURACIONES ---
    const saveConfigBtn = document.getElementById('saveConfigBtn');
    const saveAsConfigBtn = document.getElementById('saveAsConfigBtn');
    const exportConfigBtn = document.getElementById('exportConfigBtn');
    const exportConfigBtnSidebar = document.getElementById('exportConfigBtnSidebar');
    const notification = document.getElementById('notification');
    
    // --- ELEMENTOS DE LA LISTA DE CONFIGURACIONES ---
    const configsList = document.getElementById('configsList');
    const configsCount = document.getElementById('configsCount');
    const searchConfigs = document.getElementById('searchConfigs');
    
    // --- ELEMENTOS DEL MODAL ---
    const saveModal = document.getElementById('saveModal');
    const configName = document.getElementById('configName');
    const cancelSave = document.getElementById('cancelSave');
    const confirmSave = document.getElementById('confirmSave');
    
    // --- ELEMENTOS DEL MENÚ CONTEXTUAL ---
    const contextMenu = document.getElementById('contextMenu');
    const contextMenuDelete = document.getElementById('contextMenuDelete');
    
    // --- ELEMENTOS PARA CARGAR FUENTES TTF ---
    const fontFileInput = document.getElementById('fontFileInput');
    const fontNameInput = document.getElementById('fontNameInput');
    const uploadFontBtn = document.getElementById('uploadFontBtn');
    const uploadedFontsList = document.getElementById('uploadedFontsList');
    
    // --- VARIABLES GLOBALES ---
    let savedConfigs = [];
    let currentConfigId = null;
    let selectedConfigId = null;
    let uploadedFonts = [];
    let selectedFontId = null;

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
                fontSize: fontSizeRange.value,
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
            fontSizeRange.value = config.text.fontSize || 0;
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
        
        // Actualizar vistas previas y códigos hexadecimales
        for (const key in colorInputs) {
            const value = colorInputs[key].value;
            colorPreviews[key].style.backgroundColor = value;
            colorHexes[key].textContent = value;
        }

        // Aplicar a los elementos relevantes que no son manejados por las variables CSS directamente
        document.querySelector('.login-header').style.borderBottomColor = colorInputs.header.value;
        document.querySelectorAll('.btn-login').forEach(btn => {
            btn.style.backgroundColor = colorInputs.button.value;
        });
        document.querySelectorAll('.text-decoration-none').forEach(link => {
            link.style.color = colorInputs.header.value;
        });
    }
    
    function updateTextStyles() {
        const scaleValue = parseInt(fontSizeRange.value); 
        // Escala de 0 (1.0x) a 100 (1.5x)
        const scaleFactor = 1.0 + (scaleValue / 100) * 0.5; 
        const newSize = scaleFactor + 'em'; 
        const primaryFamily = primaryFontSelect.value;
        const secondaryFamily = secondaryFontSelect.value;
        
        fontSizeValue.textContent = scaleValue + '% (' + (scaleFactor * 100).toFixed(0) + '% del base)';

        // Establecer variables CSS de Texto (Localizadas en el login-card)
        rootElement.style.setProperty('--local-font-size', newSize);
        rootElement.style.setProperty('--local-font-family', primaryFamily);
        rootElement.style.setProperty('--local-title-font-family', secondaryFamily);

        if (scaleValue === 0) {
            rootElement.style.setProperty('--local-font-size', '1em'); 
        }
        
        // Actualizar vistas previas
        updateFontPreviews();
    }
    
    function updateFontPreviews() {
        const primaryFamily = primaryFontSelect.value;
        const secondaryFamily = secondaryFontSelect.value;
        
        document.getElementById('primaryFontPreviewTitle').style.fontFamily = secondaryFamily;
        document.getElementById('primaryFontPreviewText').style.fontFamily = primaryFamily;
        document.getElementById('secondaryFontPreviewTitle').style.fontFamily = secondaryFamily;
        document.getElementById('secondaryFontPreviewText').style.fontFamily = primaryFamily;
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
        const existingIndex = savedConfigs.findIndex(c => c.id === config.id);
        
        if (existingIndex !== -1) {
            // Actualizar configuración existente
            savedConfigs[existingIndex] = config;
            showNotification('Configuración actualizada', 'success');
        } else {
            // Agregar nueva configuración
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

    function renderConfigsList(filter = '') {
        const filteredConfigs = savedConfigs.filter(config => 
            config.name.toLowerCase().includes(filter.toLowerCase())
        );
        
        // Ordenar por fecha (más reciente primero)
        filteredConfigs.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
        
        if (filteredConfigs.length === 0) {
            configsList.innerHTML = '<div class="empty-configs">No hay configuraciones guardadas</div>';
            configsCount.textContent = '0 guardadas';
            return;
        }
        
        configsList.innerHTML = '';
        filteredConfigs.forEach(config => {
            const configItem = document.createElement('div');
            configItem.className = 'config-item';
            configItem.dataset.id = config.id;
            
            // Crear mini vista previa de colores
            const colorsPreview = Object.values(config.colors).map(color => 
                `<div class="color-dot" style="background-color: ${color}"></div>`
            ).join('');
            
            const date = new Date(config.timestamp);
            const formattedDate = date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            configItem.innerHTML = `
                <div class="config-item-info">
                    <div class="config-item-colors">${colorsPreview}</div>
                    <div class="config-item-content">
                        <div class="config-item-main">
                            <div class="config-item-name">${config.name}</div>
                        </div>
                        <div class="config-item-date">${formattedDate}</div>
                        <div class="font-preview">
                            Principal: ${getFontFamilyName(config.text.primaryFontFamily)} | Secundaria: ${getFontFamilyName(config.text.secondaryFontFamily)} - ${config.text.fontSize}%
                        </div>
                    </div>
                </div>
            `;
            
            configsList.appendChild(configItem);
        });
        
        configsCount.textContent = `${filteredConfigs.length} guardada${filteredConfigs.length !== 1 ? 's' : ''}`;
        
        // Agregar eventos para clic izquierdo (cargar) y clic derecho (menú contextual)
        document.querySelectorAll('.config-item').forEach(item => {
            // Clic izquierdo para cargar la configuración
            item.addEventListener('click', function(e) {
                if (e.button === 0) { // Solo clic izquierdo
                    loadConfig(this.dataset.id);
                }
            });
            
            // Clic derecho para mostrar menú contextual
            item.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                selectedConfigId = this.dataset.id;
                showContextMenu(e.clientX, e.clientY);
            });
        });
    }

    function showContextMenu(x, y) {
        contextMenu.style.left = x + 'px';
        contextMenu.style.top = y + 'px';
        contextMenu.classList.add('show');
    }

    function hideContextMenu() {
        contextMenu.classList.remove('show');
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
            fontSizeRange.value = 0;
            primaryFontSelect.value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            secondaryFontSelect.value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            
            // Actualizar la vista
            updateColors();
            updateTextStyles();
            
            showNotification('Configuración restablecida', 'info');
        }
    }

    // --- FUNCIONES PARA CARGAR FUENTES TTF ---
    function loadFontsFromStorage() {
        const saved = localStorage.getItem('zayShopFonts');
        if (saved) {
            try {
                uploadedFonts = JSON.parse(saved);
                renderUploadedFontsList();
                updateFontFamilySelects();
            } catch (e) {
                console.error('Error al cargar fuentes:', e);
                uploadedFonts = [];
            }
        }
    }

    function saveFontsToStorage() {
        localStorage.setItem('zayShopFonts', JSON.stringify(uploadedFonts));
    }

    function uploadFont() {
        const file = fontFileInput.files[0];
        const fontName = fontNameInput.value.trim();
        
        if (!file) {
            showNotification('Por favor, selecciona un archivo TTF', 'error');
            return;
        }
        
        if (!fontName) {
            showNotification('Por favor, ingresa un nombre para la fuente', 'error');
            return;
        }
        
        if (file.type !== 'font/ttf' && !file.name.toLowerCase().endsWith('.ttf')) {
            showNotification('Por favor, selecciona un archivo TTF válido', 'error');
            return;
        }
        
        // Verificar si ya existe una fuente con ese nombre
        if (uploadedFonts.some(font => font.name === fontName)) {
            showNotification('Ya existe una fuente con ese nombre', 'error');
            return;
        }
        
        // Leer el archivo como URL de datos
        const reader = new FileReader();
        reader.onload = function(e) {
            const fontDataUrl = e.target.result;
            
            // Crear un objeto de fuente
            const font = {
                id: Date.now().toString(),
                name: fontName,
                dataUrl: fontDataUrl,
                timestamp: new Date().toISOString()
            };
            
            // Agregar a la lista de fuentes
            uploadedFonts.push(font);
            
            // Guardar en localStorage
            saveFontsToStorage();
            
            // Actualizar la lista y los selectores
            renderUploadedFontsList();
            updateFontFamilySelects();
            
            // Limpiar el formulario
            fontFileInput.value = '';
            fontNameInput.value = '';
            uploadFontBtn.disabled = true;
            
            showNotification(`Fuente "${fontName}" cargada correctamente`, 'success');
        };
        
        reader.readAsDataURL(file);
    }

    function updateFontFamilySelects() {
        // Actualizar ambos selectores con todas las fuentes
        updateFontFamilySelect(primaryFontSelect);
        updateFontFamilySelect(secondaryFontSelect);
    }

    function updateFontFamilySelect(selectElement) {
        // Guardar la opción seleccionada actualmente
        const currentSelection = selectElement.value;
        
        // Remover todas las fuentes personalizadas del selector
        const customFontOptions = selectElement.querySelectorAll('option[data-custom="true"]');
        customFontOptions.forEach(option => option.remove());
        
        // Agregar todas las fuentes cargadas al selector
        uploadedFonts.forEach(font => {
            const option = document.createElement('option');
            option.value = font.name;
            option.textContent = font.name + ' (Personalizada)';
            option.dataset.custom = 'true';
            option.dataset.fontId = font.id;
            selectElement.appendChild(option);
        });
        
        // Restaurar la selección anterior si aún existe
        if (selectElement.querySelector(`option[value="${currentSelection}"]`)) {
            selectElement.value = currentSelection;
        }
    }

    function deleteFont(fontId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta fuente?')) {
            // Encontrar la fuente a eliminar
            const fontToDelete = uploadedFonts.find(f => f.id === fontId);
            
            // Eliminar la fuente de la lista
            uploadedFonts = uploadedFonts.filter(f => f.id !== fontId);
            
            // Guardar en localStorage
            saveFontsToStorage();
            
            // Actualizar la lista y los selectores
            renderUploadedFontsList();
            updateFontFamilySelects();
            
            // Si la fuente eliminada estaba seleccionada, cambiar a la fuente por defecto
            if (primaryFontSelect.value === fontToDelete.name) {
                primaryFontSelect.value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            }
            if (secondaryFontSelect.value === fontToDelete.name) {
                secondaryFontSelect.value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            }
            
            updateTextStyles();
            
            showNotification('Fuente eliminada completamente del sistema', 'info');
        }
    }

    function renderUploadedFontsList() {
        if (uploadedFonts.length === 0) {
            uploadedFontsList.innerHTML = '<div class="empty-fonts">No hay fuentes cargadas</div>';
            return;
        }
        
        uploadedFontsList.innerHTML = '';
        uploadedFonts.forEach(font => {
            const fontItem = document.createElement('div');
            fontItem.className = 'uploaded-font-item';
            fontItem.dataset.id = font.id;
            
            const date = new Date(font.timestamp);
            const formattedDate = date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            fontItem.innerHTML = `
                <div>
                    <div class="uploaded-font-name">${font.name}</div>
                    <div class="uploaded-font-date">${formattedDate}</div>
                </div>
            `;
            
            uploadedFontsList.appendChild(fontItem);
        });
        
        // Agregar eventos para clic derecho en las fuentes
        document.querySelectorAll('.uploaded-font-item').forEach(item => {
            // Clic derecho para mostrar menú contextual
            item.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                selectedFontId = this.dataset.id;
                showContextMenu(e.clientX, e.clientY);
            });
        });
    }

    // --- EVENT LISTENERS ---
    // Eventos para colores
    for (const key in colorInputs) {
        colorInputs[key].addEventListener('input', updateColors);
    }
    
    // Eventos para texto
    fontSizeRange.addEventListener('input', updateTextStyles);
    primaryFontSelect.addEventListener('change', updateTextStyles);
    secondaryFontSelect.addEventListener('change', updateTextStyles);
    
    // Eventos para gestión de configuraciones
    saveConfigBtn.addEventListener('click', () => saveCurrentConfig());
    saveAsConfigBtn.addEventListener('click', saveAsCurrentConfig);
    exportConfigBtn.addEventListener('click', exportConfig);
    exportConfigBtnSidebar.addEventListener('click', exportConfig);
    resetBtn.addEventListener('click', resetAll);
    
    // Eventos del modal
    cancelSave.addEventListener('click', closeSaveModal);
    confirmSave.addEventListener('click', () => {
        if (configName.value.trim()) {
            saveCurrentConfig(configName.value.trim());
        } else {
            showNotification('Por favor, ingresa un nombre para la configuración', 'error');
        }
    });
    
    // Eventos del menú contextual
    contextMenuDelete.addEventListener('click', () => {
        if (selectedConfigId) {
            deleteConfig(selectedConfigId);
            hideContextMenu();
        } else if (selectedFontId) {
            deleteFont(selectedFontId);
            hideContextMenu();
        }
    });
    
    // Cerrar menú contextual al hacer clic en otra parte
    document.addEventListener('click', hideContextMenu);
    
    // Evento para búsqueda
    searchConfigs.addEventListener('input', function() {
        renderConfigsList(this.value);
    });
    
    // Cerrar modal al hacer clic fuera de él
    saveModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeSaveModal();
        }
    });
    
    // Evento para la tecla Enter en el modal
    configName.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            confirmSave.click();
        }
    });
    
    // Eventos para carga de fuentes
    fontFileInput.addEventListener('change', function() {
        // Habilitar el botón si hay un archivo seleccionado
        uploadFontBtn.disabled = !this.files[0];
    });
    
    fontNameInput.addEventListener('input', function() {
        // Habilitar el botón si hay un nombre ingresado
        uploadFontBtn.disabled = !this.value.trim() || !fontFileInput.files[0];
    });
    
    uploadFontBtn.addEventListener('click', uploadFont);
    
    // --- INICIALIZACIÓN ---
    updateColors();
    updateTextStyles();
    loadConfigsFromStorage();
    loadFontsFromStorage();
    
    // Inicializar el formulario de login
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Inicio de sesión simulado', 'success');
    });
});
