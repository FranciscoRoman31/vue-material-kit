// Inicializador de configuración global simplificado
(function() {
  'use strict';
  
  // Función para aplicar configuración de tipografía
  function applyTypographyConfig() {
    try {
      const root = document.documentElement;
      
      // Aplicar valores por defecto
      root.style.setProperty('--paragraph-font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");
      root.style.setProperty('--paragraph-font-size', '16px');
      root.style.setProperty('--title-font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");
      root.style.setProperty('--title-font-size', '20px');
      
      // Obtener configuración guardada
      const savedConfig = localStorage.getItem('globalAppConfig');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        if (config.typography) {
          root.style.setProperty('--paragraph-font-family', config.typography.paragraphFont);
          root.style.setProperty('--paragraph-font-size', config.typography.paragraphSize);
          root.style.setProperty('--title-font-family', config.typography.titleFont);
          root.style.setProperty('--title-font-size', config.typography.titleSize);
        }
      }
      
      console.log('Configuración de tipografía aplicada');
    } catch (e) {
      console.error('Error applying typography config:', e);
    }
  }
  
  // Aplicar configuración cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTypographyConfig);
  } else {
    applyTypographyConfig();
  }
  
  // Función global para aplicar configuración manualmente
  window.applyGlobalTypography = applyTypographyConfig;
  
})();
