// Sistema de configuración global para tipografía y colores
class GlobalConfig {
  constructor() {
    this.config = {
      colors: {
        header: '#28a745',
        button: '#198754',
        background: '#f8f9fa',
        text: '#333333',
        title: '#212529'
      },
      typography: {
        paragraphFont: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        paragraphSize: '16px',
        titleFont: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        titleSize: '20px'
      }
    };
    this.loadFromStorage();
    this.applyToDocument();
  }

  // Cargar configuración desde localStorage
  loadFromStorage() {
    const saved = localStorage.getItem('globalAppConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.config = { ...this.config, ...parsed };
      } catch (e) {
        console.error('Error loading global config:', e);
      }
    }
  }

  // Guardar configuración en localStorage
  saveToStorage() {
    localStorage.setItem('globalAppConfig', JSON.stringify(this.config));
  }

  // Aplicar configuración al documento
  applyToDocument() {
    const root = document.documentElement;
    
    // Aplicar colores
    root.style.setProperty('--header-color', this.config.colors.header);
    root.style.setProperty('--button-color', this.config.colors.button);
    root.style.setProperty('--bg-color', this.config.colors.background);
    root.style.setProperty('--text-color', this.config.colors.text);
    root.style.setProperty('--title-color', this.config.colors.title);
    
    // Aplicar tipografía
    root.style.setProperty('--paragraph-font-family', this.config.typography.paragraphFont);
    root.style.setProperty('--paragraph-font-size', this.config.typography.paragraphSize);
    root.style.setProperty('--title-font-family', this.config.typography.titleFont);
    root.style.setProperty('--title-font-size', this.config.typography.titleSize);
  }

  // Actualizar colores
  updateColors(colors) {
    this.config.colors = { ...this.config.colors, ...colors };
    this.applyToDocument();
    this.saveToStorage();
  }

  // Actualizar tipografía
  updateTypography(typography) {
    this.config.typography = { ...this.config.typography, ...typography };
    this.applyToDocument();
    this.saveToStorage();
  }

  // Obtener configuración actual
  getConfig() {
    return this.config;
  }

  // Restablecer a valores por defecto
  reset() {
    this.config = {
      colors: {
        header: '#28a745',
        button: '#198754',
        background: '#f8f9fa',
        text: '#333333',
        title: '#212529'
      },
      typography: {
        paragraphFont: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        paragraphSize: '16px',
        titleFont: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        titleSize: '20px'
      }
    };
    this.applyToDocument();
    this.saveToStorage();
  }
}

// Crear instancia global
const globalConfig = new GlobalConfig();

// Exportar para uso en otros archivos
export default globalConfig;

// También hacer disponible globalmente
window.globalConfig = globalConfig;

