<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import "@/assets/js/login-script";

const body = document.getElementsByTagName("body")[0];
const store = useStore();

const root = document.documentElement;
const initialBg = (getComputedStyle(root).getPropertyValue("--bg-color") || getComputedStyle(document.body).getPropertyValue("background-color") || "#f8f9fa").trim();

// elementos que usaremos
let elems = {};
let listeners = [];

function setCSSVar(name, value) {
  root.style.setProperty(name, value);
  const bg = getComputedStyle(root).getPropertyValue("--bg-color");
  if (bg) {
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
  }
}

// Funciones para aplicar tamaños - definidas globalmente
const applyParagraphSizePx = (px) => {
  console.log('Aplicando tamaño párrafo:', px);
  const targets = document.querySelectorAll(".preview-card.texto-personalizable p, .preview-card.texto-personalizable .welcome-text, .preview-card.texto-personalizable li, .preview-card.texto-personalizable span, #subtitleText");
  targets.forEach(el => {
    if (px && px > 0) {
      el.style.setProperty("font-size", `${px}px`, "important");
      console.log('Elemento afectado:', el, 'tamaño:', `${px}px`);
    } else {
      el.style.removeProperty("font-size");
    }
  });
  root.style.setProperty("--local-font-size", px ? `${px}px` : "");
};

const applyTitleSizePx = (px) => {
  console.log('Aplicando tamaño título:', px);
  const targets = document.querySelectorAll(".preview-card.texto-personalizable h1, .preview-card.texto-personalizable h2, .preview-card.texto-personalizable h3, .preview-card.texto-personalizable .brand-title, .preview-card.texto-personalizable .preview-logo");
  targets.forEach(el => {
    if (px && px > 0) {
      el.style.setProperty("font-size", `${px}px`, "important");
      console.log('Título afectado:', el, 'tamaño:', `${px}px`);
    } else {
      el.style.removeProperty("font-size");
    }
  });
  root.style.setProperty("--local-title-font-size", px ? `${px}px` : "");
};

const applyPreviewParagraphFont = (font) => {
  document.querySelectorAll(".preview-card.texto-personalizable p, .preview-card.texto-personalizable .welcome-text, .preview-card.texto-personalizable li, .preview-card.texto-personalizable span").forEach(el => {
    el.style.fontFamily = font;
  });
  const subtitle = document.getElementById("subtitleText");
  if (subtitle) subtitle.style.fontFamily = font;
};

const applyPreviewTitleFont = (font) => {
  document.querySelectorAll(".preview-card.texto-personalizable h1, .preview-card.texto-personalizable h2, .preview-card.texto-personalizable h3, .preview-card.texto-personalizable .brand-title, .preview-card.texto-personalizable .preview-logo").forEach(el => {
    el.style.fontFamily = font;
  });
};

onMounted(() => {
  store.state.isAbsolute = true;
  body.classList.remove("bg-gray-100");

  // Referencias a inputs / previews
  elems = {
    headerColor: document.getElementById("headerColor"),
    headerPreview: document.getElementById("headerPreview"),
    headerHex: document.getElementById("headerHex"),

    buttonColor: document.getElementById("buttonColor"),
    buttonPreview: document.getElementById("buttonPreview"),
    buttonHex: document.getElementById("buttonHex"),

    bgColor: document.getElementById("bgColor"),
    bgPreview: document.getElementById("bgPreview"),
    bgHex: document.getElementById("bgHex"),

    textColor: document.getElementById("textColor"),
    textPreview: document.getElementById("textPreview"),
    textHex: document.getElementById("textHex"),

    titleColor: document.getElementById("titleColor"),
    titlePreview: document.getElementById("titlePreview"),
    titleHex: document.getElementById("titleHex"),

    // paragraph/title size inputs (px)
    paragraphFontSize: document.getElementById("paragraphFontSize"),
    paragraphFontSizeValue: document.getElementById("paragraphFontSizeValue"),
    titleFontSize: document.getElementById("titleFontSize"),
    titleFontSizeValue: document.getElementById("titleFontSizeValue"),

    primaryFontSelect: document.getElementById("primaryFontSelect"),
    secondaryFontSelect: document.getElementById("secondaryFontSelect"),

    previewButton: document.getElementById("previewBtn") || document.querySelector(".btn-login") || document.querySelector(".btn.btn-primary"),
  };

  console.log('Elementos encontrados:', {
    paragraphFontSize: !!elems.paragraphFontSize,
    titleFontSize: !!elems.titleFontSize
  });

  // Inicializar valores desde variables CSS
  const vars = {
    "--header-color": getComputedStyle(root).getPropertyValue("--header-color")?.trim() || "#28a745",
    "--button-color": getComputedStyle(root).getPropertyValue("--button-color")?.trim() || "#198754",
    "--bg-color": getComputedStyle(root).getPropertyValue("--bg-color")?.trim() || initialBg || "#f8f9fa",
    "--text-color": getComputedStyle(root).getPropertyValue("--text-color")?.trim() || "#333333",
    "--title-color": getComputedStyle(root).getPropertyValue("--title-color")?.trim() || "#212529",
    "--local-font-size": getComputedStyle(root).getPropertyValue("--local-font-size")?.trim() || "16px",
    "--local-font-family": getComputedStyle(root).getPropertyValue("--local-font-family")?.trim() || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    "--local-title-font-family": getComputedStyle(root).getPropertyValue("--local-title-font-family")?.trim() || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    "--local-title-font-size": getComputedStyle(root).getPropertyValue("--local-title-font-size")?.trim() || "32px",
  };

  // helper para convertir unidades a píxeles
  const basePx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const sizeToPx = (val) => {
    if (!val) return null;
    val = String(val).trim();
    if (val.endsWith("px")) return parseFloat(val);
    if (val.endsWith("em")) return parseFloat(val) * basePx;
    if (val.endsWith("%")) return (parseFloat(val) / 100) * basePx;
    const n = parseFloat(val);
    return Number.isFinite(n) ? n : null;
  };

  // Sync UI with vars
  if (elems.headerColor) { try { elems.headerColor.value = vars["--header-color"]; } catch(e){} }
  if (elems.headerPreview) elems.headerPreview.style.backgroundColor = vars["--header-color"];
  if (elems.headerHex) elems.headerHex.textContent = vars["--header-color"];

  if (elems.buttonColor) { try { elems.buttonColor.value = vars["--button-color"]; } catch(e){} }
  if (elems.buttonPreview) elems.buttonPreview.style.backgroundColor = vars["--button-color"];
  if (elems.buttonHex) elems.buttonHex.textContent = vars["--button-color"];
  if (elems.previewButton) {
    elems.previewButton.style.backgroundColor = vars["--button-color"];
    elems.previewButton.style.borderColor = vars["--button-color"];
  }

  if (elems.bgColor) { try { elems.bgColor.value = vars["--bg-color"]; } catch(e){} }
  if (elems.bgPreview) elems.bgPreview.style.backgroundColor = vars["--bg-color"];
  if (elems.bgHex) elems.bgHex.textContent = vars["--bg-color"];
  document.documentElement.style.backgroundColor = vars["--bg-color"];
  document.body.style.backgroundColor = vars["--bg-color"];

  if (elems.textColor) { try { elems.textColor.value = vars["--text-color"]; } catch(e){} }
  if (elems.textPreview) elems.textPreview.style.backgroundColor = vars["--text-color"];
  if (elems.textHex) elems.textHex.textContent = vars["--text-color"];
  document.body.style.color = vars["--text-color"];
  const subtitleEl = document.getElementById("subtitleText");
  if (subtitleEl) subtitleEl.style.color = vars["--text-color"];

  // aplicar las fuentes iniciales
  applyPreviewParagraphFont(vars["--local-font-family"]);
  applyPreviewTitleFont(vars["--local-title-font-family"]);

  // Inicializar inputs de tamaño en px
  const initialParagraphPx = sizeToPx(vars["--local-font-size"]) || 16;
  const initialTitlePx = sizeToPx(vars["--local-title-font-size"]) || 32;
  
  if (elems.paragraphFontSize) {
    try { 
      elems.paragraphFontSize.value = Math.round(initialParagraphPx); 
      console.log('Valor inicial párrafo:', elems.paragraphFontSize.value);
    } catch(e){}
  }
  if (elems.paragraphFontSizeValue) elems.paragraphFontSizeValue.textContent = `${Math.round(initialParagraphPx)}px`;
  applyParagraphSizePx(Math.round(initialParagraphPx));

  if (elems.titleFontSize) {
    try { 
      elems.titleFontSize.value = Math.round(initialTitlePx); 
      console.log('Valor inicial título:', elems.titleFontSize.value);
    } catch(e){}
  }
  if (elems.titleFontSizeValue) elems.titleFontSizeValue.textContent = `${Math.round(initialTitlePx)}px`;
  applyTitleSizePx(Math.round(initialTitlePx));

  if (elems.titleColor) { try { elems.titleColor.value = vars["--title-color"]; } catch(e){} }
  if (elems.titlePreview) elems.titlePreview.style.backgroundColor = vars["--title-color"];
  if (elems.titleHex) elems.titleHex.textContent = vars["--title-color"];
  const titles = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
  titles.forEach(t => t.style.color = vars["--title-color"]);

  const siteHeader = document.querySelector(".preview-site-header");
  if (siteHeader) siteHeader.style.backgroundColor = vars["--header-color"];

  if (elems.primaryFontSelect) {
    try { elems.primaryFontSelect.value = vars["--local-font-family"].replace(/"/g,""); } catch(e){}
    document.documentElement.style.setProperty("--local-font-family", vars["--local-font-family"]);
    applyPreviewParagraphFont(vars["--local-font-family"]);
  }
  if (elems.secondaryFontSelect) {
    try { elems.secondaryFontSelect.value = vars["--local-title-font-family"].replace(/"/g,""); } catch(e){}
    document.documentElement.style.setProperty("--local-title-font-family", vars["--local-title-font-family"]);
    applyPreviewTitleFont(vars["--local-title-font-family"]);
  }

  // Helper para crear listeners
  const addListener = (el, event, fn) => {
    if (!el) {
      console.log('Elemento no encontrado para listener');
      return;
    }
    el.addEventListener(event, fn);
    listeners.push({ el, event, fn });
  };

  // COLOR LISTENERS (manteniendo los existentes)
  addListener(elems.headerColor, "input", (e) => {
    const c = e.target.value;
    setCSSVar("--header-color", c);
    const siteHeader = document.querySelector(".preview-site-header");
    if (siteHeader) siteHeader.style.backgroundColor = c;
    if (elems.headerPreview) elems.headerPreview.style.backgroundColor = c;
    if (elems.headerHex) elems.headerHex.textContent = c;
  });

  addListener(elems.buttonColor, "input", (e) => {
    const c = e.target.value;
    if (elems.previewButton) {
      elems.previewButton.style.backgroundColor = c;
      elems.previewButton.style.borderColor = c;
    }
    setCSSVar("--button-color", c);
    if (elems.buttonPreview) elems.buttonPreview.style.backgroundColor = c;
    if (elems.buttonHex) elems.buttonHex.textContent = c;
  });

  addListener(elems.bgColor, "input", (e) => {
    const c = e.target.value;
    setCSSVar("--bg-color", c);
    document.documentElement.style.backgroundColor = c;
    document.body.style.backgroundColor = c;
    if (elems.bgPreview) elems.bgPreview.style.backgroundColor = c;
    if (elems.bgHex) elems.bgHex.textContent = c;
  });

  addListener(elems.textColor, "input", (e) => {
    const c = e.target.value;
    setCSSVar("--text-color", c);
    document.body.style.color = c;
    const subtitleEl2 = document.getElementById("subtitleText");
    if (subtitleEl2) subtitleEl2.style.color = c;
    if (elems.textPreview) elems.textPreview.style.backgroundColor = c;
    if (elems.textHex) elems.textHex.textContent = c;
  });

  addListener(elems.titleColor, "input", (e) => {
    const c = e.target.value;
    setCSSVar("--title-color", c);
    const allT = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    allT.forEach(t => t.style.color = c);
    if (elems.titlePreview) elems.titlePreview.style.backgroundColor = c;
    if (elems.titleHex) elems.titleHex.textContent = c;
  });

  // LISTENERS PARA TAMAÑOS DE FUENTE - CORREGIDOS
  if (elems.paragraphFontSize) {
    console.log('Agregando listener para párrafo');
    const onParagraphSizeInput = (e) => {
      const px = parseInt(e.target.value, 10);
      console.log('Input párrafo cambiado:', px);
      if (elems.paragraphFontSizeValue) {
        elems.paragraphFontSizeValue.textContent = `${px}px`;
      }
      applyParagraphSizePx(px);
    };
    
    addListener(elems.paragraphFontSize, "input", onParagraphSizeInput);
    addListener(elems.paragraphFontSize, "change", onParagraphSizeInput);
  }

  if (elems.titleFontSize) {
    console.log('Agregando listener para título');
    const onTitleSizeInput = (e) => {
      const px = parseInt(e.target.value, 10);
      console.log('Input título cambiado:', px);
      if (elems.titleFontSizeValue) {
        elems.titleFontSizeValue.textContent = `${px}px`;
      }
      applyTitleSizePx(px);
    };
    
    addListener(elems.titleFontSize, "input", onTitleSizeInput);
    addListener(elems.titleFontSize, "change", onTitleSizeInput);
  }

  // FONT SELECTS
  if (elems.primaryFontSelect) {
    const onPrimaryFont = (e) => {
      const val = e.target.value;
      root.style.setProperty("--local-font-family", val);
      applyPreviewParagraphFont(val);
    };
    addListener(elems.primaryFontSelect, "change", onPrimaryFont);
  }

  if (elems.secondaryFontSelect) {
    const onSecondaryFont = (e) => {
      const val = e.target.value;
      root.style.setProperty("--local-title-font-family", val);
      applyPreviewTitleFont(val);
    };
    addListener(elems.secondaryFontSelect, "change", onSecondaryFont);
  }

  // Accessibility for button text color
  const adjustButtonText = (hex) => {
    if (!hex) return;
    const c = hex.replace("#","");
    let lum;
    if (c.length === 3) {
      const r = parseInt(c[0]+c[0],16), g = parseInt(c[1]+c[1],16), b = parseInt(c[2]+c[2],16);
      lum = (0.299*r + 0.587*g + 0.114*b)/255;
    } else {
      const r = parseInt(c.substring(0,2),16), g = parseInt(c.substring(2,4),16), b = parseInt(c.substring(4,6),16);
      lum = (0.299*r + 0.587*g + 0.114*b)/255;
    }
    if (elems.previewButton) elems.previewButton.style.color = (lum > 0.7) ? "#000" : "#fff";
  };

  addListener(elems.buttonColor, "input", (e)=> adjustButtonText(e.target.value));
  if (elems.buttonColor && elems.buttonColor.value) adjustButtonText(elems.buttonColor.value);

});

onUnmounted(() => {
  body.classList.add("bg-gray-100");
  listeners.forEach(({el, event, fn}) => {
    try { el.removeEventListener(event, fn); } catch(e){}
  });
  listeners = [];
  root.style.setProperty("--bg-color", initialBg);
  document.documentElement.style.backgroundColor = initialBg;
  document.body.style.backgroundColor = initialBg;
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
      <div class="color-label">Color 1 (Header)</div>
      <input type="color" class="color-input" id="headerColor" value="#28a745" />
      <div class="color-preview">
        <div id="headerPreview" style="width: 30px; height: 30px; background-color: #28a745; border-radius: 6px;"></div>
        <div class="color-hex" id="headerHex">#28a745</div>
      </div>
    </div>

    <div class="color-control">
      <div class="color-label">Color 2 (Botón)</div>
      <input type="color" class="color-input" id="buttonColor" value="#198754" />
      <div class="color-preview">
        <div id="buttonPreview" style="width: 30px; height: 30px; background-color: #198754; border-radius: 6px;"></div>
        <div class="color-hex" id="buttonHex">#198754</div>
      </div>
    </div>

    <div class="color-control">
      <div class="color-label">Color 3 (Fondo página)</div>
      <input type="color" class="color-input" id="bgColor" value="#f8f9fa" />
      <div class="color-preview">
        <div id="bgPreview" style="width: 30px; height: 30px; background-color: #f8f9fa; border-radius: 6px; border: 1px solid #ddd;"></div>
        <div class="color-hex" id="bgHex">#f8f9fa</div>
      </div>
    </div>

    <div class="color-control">
      <div class="color-label">Color 4 (Texto)</div>
      <input type="color" class="color-input" id="textColor" value="#333333" />
      <div class="color-preview">
        <div id="textPreview" style="width: 30px; height: 30px; background-color: #333333; border-radius: 6px;"></div>
        <div class="color-hex" id="textHex">#333333</div>
      </div>
    </div>

    <div class="color-control">
      <div class="color-label">Color 5 (Títulos)</div>
      <input type="color" class="color-input" id="titleColor" value="#212529" />
      <div class="color-preview">
        <div id="titlePreview" style="width: 30px; height: 30px; background-color: #212529; border-radius: 6px;"></div>
        <div class="color-hex" id="titleHex">#212529</div>
      </div>
    </div>

    <h4 class="sidebar-title mt-4">Personalizar Texto</h4>
    <div class="additional-options" style="border-top: none; margin-top: 0; padding-top: 0;">
      <!-- Tamaño párrafos/subtítulos (px) -->
      <div class="option-group">
        <label class="option-label" for="paragraphFontSize">Tamaño de fuente párrafos / subtítulos (px)</label>
        <div style="display:flex;gap:8px;align-items:center;">
          <input type="range" id="paragraphFontSize" class="form-range font-size-range" min="8" max="72" value="16" step="1" aria-label="Tamaño párrafo" />
           <span id="paragraphFontSizeValue">16px</span>
         </div>
       </div>
 
       <!-- Tamaño títulos (px) -->
       <div class="option-group">
         <label class="option-label" for="titleFontSize">Tamaño de fuente títulos (px)</label>
         <div style="display:flex;gap:8px;align-items:center;">
          <input type="range" id="titleFontSize" class="form-range font-size-range" min="10" max="120" value="32" step="1" aria-label="Tamaño títulos" />
           <span id="titleFontSizeValue">32px</span>
         </div>
       </div>

      <!-- Fuente principal -> párrafos/subtítulos -->
      <div class="option-group">
        <label class="option-label" for="primaryFontSelect">Fuente Principal (Párrafos / Subtítulos)</label>
        <select class="option-select" id="primaryFontSelect">
          <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" selected>Segoe UI (Defecto)</option>
          <option value="Roboto, sans-serif">Roboto</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="'Courier New', monospace">Courier New</option>
        </select>
      </div>

      <!-- Fuente secundaria -> títulos -->
      <div class="option-group">
        <label class="option-label" for="secondaryFontSelect">Fuente Secundaria (Títulos)</label>
        <select class="option-select" id="secondaryFontSelect">
          <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" selected>Segoe UI (Defecto)</option>
          <option value="Roboto, sans-serif">Roboto</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="'Courier New', monospace">Courier New</option>
        </select>
      </div>
    </div>

    <div class="font-upload-section">
      <h5 class="font-upload-title">Cargar Fuentes Personalizadas</h5>
      <div class="font-upload-control">
        <label class="font-upload-label">Seleccionar archivo TTF</label>
        <input type="file" class="font-upload-input" id="fontFileInput" accept=".ttf" />
      </div>
      <div class="font-upload-control">
        <label class="font-upload-label">Nombre de la fuente</label>
        <input type="text" class="font-upload-input" id="fontNameInput" placeholder="Ingresa un nombre para la fuente" />
      </div>
      <button class="font-upload-btn" id="uploadFontBtn" disabled><i class="fas fa-upload"></i> Cargar Fuente</button>
    </div>

    <button class="reset-btn" id="resetAll">
      <i class="fas fa-undo"></i> Restablecer Todo
    </button>
  </div>

  <!-- Right sidebar: configuraciones guardadas por el administrador -->
  <div class="configs-sidebar">
    <div class="config-management">
      <h5 class="config-management-title">Gestión de Configuraciones</h5>
      <div class="config-management-buttons">
        <button class="config-management-btn success" id="saveAsConfigBtn"><i class="fas fa-save"></i> Guardar Como...</button>
        <button class="config-management-btn" id="exportConfigBtnSidebar"><i class="fas fa-download"></i> Exportar Configuración</button>
      </div>

      <div class="configs-header">
        <h6 class="configs-title">Mis Configuraciones</h6>
        <span class="configs-count" id="configsCount">0 guardadas</span>
      </div>

      <div class="search-box">
        <input type="text" class="search-input" id="searchConfigs" placeholder="Buscar configuraciones..." />
      </div>

      <div class="configs-list" id="configsList">
        <div class="empty-configs">No hay configuraciones guardadas</div>
      </div>
    </div>
  </div>

  <!-- Main preview area (donde estaba el login) -->
  <main class="main-content mt-0">
    <div class="preview-container">
      <div class="preview-card texto-personalizable">

        <!-- HEADER de la vista de muestra -->
        <header class="preview-site-header">
          <div class="preview-logo">Logo</div>
          <nav class="preview-nav">
            <a href="#" class="nav-link">Inicio</a>
            <a href="#" class="nav-link">Productos</a>
            <a href="#" class="nav-link">Contacto</a>
          </nav>
        </header>

        <div class="preview-header">
          <h1 class="brand-title">Titulo</h1>
          <p class="welcome-text">Así se verá tu página con los colores y tipografías seleccionadas.</p>
        </div>

        <div class="preview-body">
          <div class="preview-sample">
            <!-- subtítulo controlado por el input de color de texto -->
            <h3 id="subtitleText" style="margin:0 0 8px 0;">Substitulo</h3>
            <p style="margin:0 0 16px 0;">Párrafo de ejemplo para mostrar la tipografía y el color de texto aplicados en la página.</p>
            <!-- Botón de muestra con id para aplicar el color 2 -->
            <button id="previewBtn" class="btn btn-primary btn-lg w-100">Boton</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
/* Variables CSS (Adaptadas del código proporcionado) */
:root {
  --header-color: #28a745;
  --button-color: #198754;
  --bg-color: #f8f9fa;
  --text-color: #333333;
  --title-color: #212529;
  /* tamaños ahora en px por defecto */
  --local-font-size: 16px;
  --local-title-font-size: 32px;
  --local-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --local-title-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

html,
body {
  height: 100%;
  background-color: var(--bg-color) !important;
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
  margin: 0;
  padding: 0;
}

* {
  color: var(--text-color);
}

/* Mantengo título styling */
h1,h2,h3,h4,h5,h6 {
  color: var(--title-color);
}

/* Barra de configuración superior */
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

/* Left sidebar */
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

/* TEXTO LOCAL */
.login-card.texto-personalizable,
.preview-card.texto-personalizable,
.login-card.texto-personalizable *,
.preview-card.texto-personalizable * {
  font-family: var(--local-font-family) !important;
}

.login-card.texto-personalizable p,
.preview-card.texto-personalizable p,
.login-card.texto-personalizable label,
.preview-card.texto-personalizable label,
.login-card.texto-personalizable a,
.preview-card.texto_personalizable a,
.login-card.texto-personalizable .form-control,
.preview-card.texto_personalizable .form-control,
.login-card.texto-personalizable .btn-login,
.preview-card.texto_personalizable .btn-login {
  font-family: var(--local-font-family) !important;
}

/* Aplicar fuente secundaria a títulos dentro de login-card y preview-card */
.login-card.texto-personalizable h1,
.preview-card.texto-personalizable h1,
.login-card.texto-personalizable h2,
.preview-card.texto_personalizable h2,
.login-card.texto-personalizable h3,
.preview-card.texto_personalizable h3,
.login-card.texto-personalizable h4,
.preview-card.texto_personalizable h4,
.login-card.texto-personalizable h5,
.preview-card.texto_personalizable h5,
.login-card.texto-personalizable h6,
.preview-card.texto_personalizable h6 {
  font-family: var(--local-title-font-family) !important;
}

.login-card.texto-personalizable,
.preview-card.texto-personalizable,
.login-card.texto-personalizable p,
.preview-card.texto-personalizable p,
.login-card.texto-personalizable h1,
.preview-card.texto-personalizable h1,
.login-card.texto-personalizable h2,
.preview-card.texto-personalizable h2,
.login-card.texto-personalizable label,
.preview-card.texto_personalizable label,
.login-card.texto-personalizable a,
.preview-card.texto_personalizable a,
.login-card.texto-personalizable h4,
.preview-card.texto_personalizable h4 {
  font-size: var(--local-font-size) !important;
}

.login-card.texto-personalizable .form-control,
.preview-card.texto-personalizable .form-control,
.login-card.texto-personalizable .btn-login,
.preview-card.texto-personalizable .btn-login {
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

/* Right sidebar para configuraciones guardadas */
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

/* Contenedor principal */
.preview-container {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-left: 380px;
  margin-right: 300px;
  margin-top: 60px;
  width: calc(100% - 380px - 300px);
}

/* Card de previsualización */
.preview-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  overflow: hidden;
  width: 100%;
  max-width: 520px;
  padding: 0;
}

/* Header interno de la vista previa */
.preview-site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: var(--header-color);
  color: #fff;
  gap: 12px;
  border-radius: 10px 10px 0 0;
}

.preview-logo {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.2px;
  font-family: var(--local-title-font-family);
}

.preview-nav .nav-link {
  color: rgba(255,255,255,0.95);
  margin-left: 12px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
}

.preview-nav .nav-link:hover {
  opacity: 0.9;
  text-decoration: underline;
}

/* Ajuste: mantengo padding interno para el resto del contenido */
.preview-header,
.preview-body {
  padding: 16px;
}

/* Botón de preview: usar variable --button-color y prioridad */
#previewBtn,
.preview-card #previewBtn,
.btn-preview-custom {
  background-color: var(--button-color) !important;
  border-color: var(--button-color) !important;
  color: var(--button-text-color, #fff) !important;
  box-shadow: none !important;
}

/* Hover ligero para el botón de preview */
.preview-card #previewBtn:hover {
  filter: brightness(0.95);
}

/* Forzar que el subtítulo de la tarjeta de previsualización use la variable --local-font-size y color */
.preview-sample h3#subtitleText {
  color: var(--text-color) !important;
  font-size: var(--local-font-size);
}

/* Asegurar que los títulos usen la variable --local-title-font-size en la preview (sin !important para permitir override si se necesita) */
.preview-card.texto-personalizable h1,
.preview-card.texto-personalizable .brand-title {
  font-size: var(--local-title-font-size);
  line-height: 1.1;
}

.preview-card.texto-personalizable h2 {
  font-size: calc(var(--local-title-font-size) * 0.8);
  line-height: 1.15;
}

.preview-card.texto-personalizable h3 {
  font-size: calc(var(--local-title-font-size) * 0.6);
  line-height: 1.2;
}

/* Asegurar que párrafos en preview usen --local-font-size */
.preview-card.texto-personalizable p,
.preview-card.texto-personalizable .welcome-text {
  font-size: var(--local-font-size);
}
</style>

