import { ref, reactive, onMounted } from 'vue';

export function useGlobalConfig() {
  const config = reactive({
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
  });
  
  const isLoaded = ref(false);

  // Cargar configuración desde localStorage
  const loadConfig = () => {
    try {
      const saved = localStorage.getItem('globalAppConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(config, parsed);
      }
    } catch (e) {
      console.error('Error loading config:', e);
    }
  };

  // Aplicar configuración al documento
  const applyToDocument = () => {
    const root = document.documentElement;
    root.style.setProperty('--header-color', config.colors.header);
    root.style.setProperty('--button-color', config.colors.button);
    root.style.setProperty('--bg-color', config.colors.background);
    root.style.setProperty('--text-color', config.colors.text);
    root.style.setProperty('--title-color', config.colors.title);
    root.style.setProperty('--paragraph-font-family', config.typography.paragraphFont);
    root.style.setProperty('--paragraph-font-size', config.typography.paragraphSize);
    root.style.setProperty('--title-font-family', config.typography.titleFont);
    root.style.setProperty('--title-font-size', config.typography.titleSize);
  };

  // Guardar configuración
  const saveConfig = () => {
    localStorage.setItem('globalAppConfig', JSON.stringify(config));
  };

  // Actualizar colores
  const updateColors = (newColors) => {
    Object.assign(config.colors, newColors);
    applyToDocument();
    saveConfig();
  };

  // Actualizar tipografía
  const updateTypography = (newTypography) => {
    Object.assign(config.typography, newTypography);
    applyToDocument();
    saveConfig();
  };

  // Restablecer configuración
  const resetConfig = () => {
    config.colors = {
      header: '#28a745',
      button: '#198754',
      background: '#f8f9fa',
      text: '#333333',
      title: '#212529'
    };
    config.typography = {
      paragraphFont: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      paragraphSize: '16px',
      titleFont: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      titleSize: '20px'
    };
    applyToDocument();
    saveConfig();
  };

  // Aplicar configuración al montar el componente
  onMounted(() => {
    loadConfig();
    applyToDocument();
    isLoaded.value = true;
  });

  return {
    config,
    isLoaded,
    updateColors,
    updateTypography,
    resetConfig,
    applyToDocument
  };
}
