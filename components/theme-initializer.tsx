"use client"

export function ThemeInitializer() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var storageKey = "site-builder-config-v3";
              var savedData = localStorage.getItem(storageKey);
              
              if (savedData) {
                var parsed = JSON.parse(savedData);
                var estilos = parsed.estilos || {};
                var colores = estilos.colores || {};
                var tipografia = estilos.tipografia || {};
                var root = document.documentElement;

                // 1. Aplicar variables personalizadas (para tus componentes)
                if (colores.primario) root.style.setProperty('--color-primario', colores.primario);
                if (colores.fondo) root.style.setProperty('--color-fondo', colores.fondo);
                if (colores.texto) root.style.setProperty('--color-texto', colores.texto);

                // 2. SOLUCIÓN AL FLASH BLANCO:
                // Sobrescribir las variables de sistema que usa el <body>
                if (colores.fondo) {
                    root.style.setProperty('--background', colores.fondo);
                }
                if (colores.texto) {
                    root.style.setProperty('--foreground', colores.texto);
                }
                
                // 3. Tipografía
                if (tipografia.fuente) {
                   root.style.setProperty('--fuente-base', tipografia.fuente);
                }
              }
            } catch (e) {
              // Fallo silencioso
            }
          })()
        `,
      }}
    />
  )
}